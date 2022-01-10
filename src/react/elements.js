class Element {
  constructor(props) {
    this.props = props
  }
  setState(){

  }
}

/*
*   将文本节点或者组件转为虚拟DOM
*   以类的方式创建虚拟DOM, 可以标记该虚拟DOM对象的出处, 用于做判断
* */
export function createElement(type,props={},...children){
  props.children = children || []
  return new Element(props)
}
