import React, { Component } from 'react';
import "./button.css"

class Button extends Component{

  

  render(){
    var clockInStyle = {
      background:"#048def",
      borderWidth:"0px",
      borderRadius:"5px"
    }
    var clockOutStyle = {
      background:"#edc204",
      borderWidth:"0px",
      borderRadius:"5px"
    }

    if (this.props.clockedIn === true){
      clockInStyle={
        background:"#01497c",
        borderWidth:"0px",
        borderRadius:"5px"
      }
    }else{
      clockOutStyle={
        background:"#8c7304",
        borderWidth:"0px",
        borderRadius:"5px"
      }
    }
    return(
      <div className={"row buttons"}>
          <button style={clockInStyle} className={"btn btn-primary"} onClick={this.props.func1}>Clock in</button>
          <button style={clockOutStyle} lassName={"btn btn-warning"} onClick={this.props.func2}>Clock out</button>
      </div>
    )
  }
}

export default Button