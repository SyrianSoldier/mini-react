import createUnit from "./unit";
import $ from 'jquery'
const React = {
  render,
  rootId:0
}

/*
* babel将文本,组件元素转为虚拟dom(createElement)
* render将虚拟DOM转为真实DOM, 插入页面中
* 对每个节点和子节点设置了自定义属性data-reactid
* 采用的工厂模式
* */
function render (element,container){
  const unitInstance = createUnit(element)
  const markup = unitInstance.getMarkUp(React.rootId)
  $(container).html(markup)

}

export default React
