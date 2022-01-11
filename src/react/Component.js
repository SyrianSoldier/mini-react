export class Component {
  constructor(props) {
   this.props = props
  }
  setState(partialState){
    /* 委派给unit对象处理 */
    this._currentUnit.update(null,partialState)
  }

}
