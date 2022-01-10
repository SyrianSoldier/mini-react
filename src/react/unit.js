import {Element} from './elements'
import $ from 'jquery'
class Unit {
  constructor(element) {
    this._currentElement = element //储存虚拟DOM或者基本数据类型
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
class CompositeUnit extends Unit {
  getMarkUp(rootId) {
    this._rootId = rootId
    const {type:Component,props} = this._currentElement // 从虚拟DOM中取出组件信息
    const componentInstance = this._componentInstance = new Component(props) // 创建类组件实例
    this._componentInstance.currentUnit = this  // 保存组件实例和unit实例
    componentInstance.componentWillMount &&  componentInstance.componentWillMount() // 调用willMount Hook
    const virtualDom = componentInstance.render() // 得到渲染的虚拟Dom
    $(document).on('mounted',()=>{ //绑定组件已经挂载事件, 必须在createUnit之前, 因为createUnit可能会导致子组件的重新绑定, 父组件的mounted应该在子组件的前面
      componentInstance.componentDidMount && componentInstance.componentDidMount()
    })
    const unitInstance =this._renderedUnitInstance= createUnit(virtualDom) // 将类组件需要渲染的结构通过工厂函数创建出渲染实例
    return unitInstance.getMarkUp(rootId) // 得到标记结构, 并返回
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
  /* 当为组件时 */
  if(element instanceof Element && typeof element.type === 'function'){
    return new CompositeUnit(element)
  }
}
