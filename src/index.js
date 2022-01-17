import React,{createElement,Component} from "./react";

class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {number:1}
  }
  handleClick = () => {
    this.setState({number:this.state.number + 1})
  }
  render() {
    const { number} = this.state
    const p = createElement('p', {}, this.state.number)
    const button = createElement('button', {onClick:this.handleClick},'+')
    return createElement('div', { style: {backgroundColor:number % 2 === 0? 'green':'red',color: number %2 === 0?'red':'green'}}, p,button)
  }
}

React.render(createElement(Person,null),document.querySelector('#root'))
