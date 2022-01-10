import {Element} from './elements'
import $ from 'jquery'
class Unit {
  constructor(element) {
    this._currentElement = element
  }
  getMarkUp(){
    throw new Error('请实现getMarkup方法!')
  }
}
/*
*  文本节点element保存了文本内容
* */
class TextUnit extends Unit{
  getMarkUp(rootId) {
    this._rootId = rootId
    return `<span data-reactid="${rootId}">${this._currentElement}</span>`
  }
}
class NativeUnit extends Unit {
  getMarkUp(rootId) {
    this._rootId = rootId
    const {type,props} = this._currentElement
    let tagStart = `<${type} data-reactid=${rootId}`
    let tagContent = ''
    const tagEnd = `</${type}>`

    /* 处理props */
    for (let propName in props) {
      const isDomEvent = /^on[A-Z]+/.test(propName)

      if(isDomEvent){ // 如果是dom事件
        const eventType = propName.substring(2).toLowerCase() //将onClick ==> click
        $(document).delegate(`[data-reactid="${rootId}"]`,`${eventType}.${rootId}`,props[propName])
      }else if(propName === 'children'){ // 如果是子节点, 虚拟dom将所有的子节点都挂在了props中
        props[propName].forEach((child,index) => {
          const childInstance = createUnit(child)
          const markUp = childInstance.getMarkUp(`${rootId}.${index}`)
          tagContent += markUp
        })
      }else if(propName === 'className'){ // 如果是className
        tagStart += ` class="${props[propName]}" `
      }else if(propName === 'style'){ // 如果是style对象
        const styles  = Object.entries(props[propName]).map(([key,styleValue]) => {
          const styleName = `${key.replace(/[A-Z]/g,matches => `-${matches.toLowerCase()}`)}`
          return (styleName+':'+styleValue) // color:red
        }).join(';')
        tagStart += ` style="${styles}"`
      } else { // 常规属性
        tagStart += ` ${propName}=${props[propName]} `
      }
  }

    return tagStart + '>' + tagContent + tagEnd
}
}

export default function createUnit(element){
  /* 当为文本节点时 */
  if(typeof element === "string" || typeof element === 'number'){
    return new TextUnit(element)
  }
  /* 当为元素节点时 */
  if(element instanceof Element && typeof element.type === 'string'){
    return new NativeUnit(element)
  }
}
