import React,{createElement,Component} from "./react";

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {number:1}
  }
  componentWillMount(){
    console.log('组件将要被挂载')
  }
  shouldComponentUpdate(nextProps, nextState) { 
    console.log('组件将要更新',nextProps, nextState)
    return true
  }
  componentDidUpdate() { 
    console.log('组件已经更新')
  }
  componentDidMount(){
    setInterval(() => {
      this.setState({
        number:this.state.number + 1
      })
    },1000)
  }
  click = () => {
    console.log('被点击了')
  }
  render(){
    return this.state.number
  }
}

React.render(createElement(Person,null),document.querySelector('#root'))
