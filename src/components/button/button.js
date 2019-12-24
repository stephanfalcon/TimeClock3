import React, { Component } from 'react';
import "./button.css"

class Button extends Component{
  render(){
    return(
      <div className={"row buttons"}>
          <button className={"btn btn-primary"} onClick={this.props.func1}>Clock in</button>
          <button className={"btn btn-warning"} onClick={this.props.func2}>Clock out</button>
      </div>
    )
  }
}

export default Button