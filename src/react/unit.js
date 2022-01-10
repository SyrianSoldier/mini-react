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
export default function createUnit(element){
  /* 当为文本节点时 */
  if(typeof element === "string" || typeof element === 'number'){
    return new TextUnit(element)
  }
}
