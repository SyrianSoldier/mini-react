import React,{createElement} from "./react";

//js中出现html代码会被babel转义
const element = (
  <div>
    <span>hello react</span>
  </div>
)
/* 转义后的东西 */
function click (){
  console.log('点击事件')
}
const elementVirtualDom = React.createElement(
  'div',
  null,
  createElement('span',{style:{color:'red',backgroundColor:'orange'},onClick:click},'hello react')
)
/* 将虚拟DOM转为真实节点插入页面中 */
React.render(elementVirtualDom,document.querySelector('#root'))
