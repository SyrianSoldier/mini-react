import React,{createElement,Component} from "./react";

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {number:1}
  }
  componentWillMount(){
    console.log('组件将要被挂载')
  }
  componentDidMount(){
    console.log('组件已被挂载')
  }
  click = () => {
    console.log('被点击了')
  }
  render(){
    const p = createElement('p',null,this.state.number)
    const button = createElement('button',{onClick:this.click},'+')
    return createElement('div',null,p,button)
  }
}

React.render(createElement(Person,null),document.querySelector('#root'))
