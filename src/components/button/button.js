import React, { Component } from 'react';
import "./button.css"


class Button extends Component{
  
  render(){
    
    var clockInIndicator = ''

    var breakIndicator = this.props.onBreak
    var breakText = ""

    if (breakIndicator === true){
      var breakStyle = {
        background:"red",
        borderWidth:"0px",
        borderRadius:"5px",
        width:"10%"
      }
      breakText = "ON BREAK"
    }else{
      var breakStyle = {
        background:"green",
        borderWidth:"0px",
        borderRadius:"5px",
        width:"10%"
      }
      breakText = "OFF BREAK"
    }

    if (this.props.clockedIn === true){
    clockInIndicator = "Clocked in"
    }else{
    clockInIndicator = "Clocked out"
    }
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

    var indicatorStyle = {
      background:"#7F0000",
      borderWidth:"0px",
      borderRadius:"5px"
    }

    if (this.props.clockedIn === true){
      clockInStyle={
        background:"#01497c",
        borderWidth:"0px",
        borderRadius:"5px"
      }
      indicatorStyle = {
        background:"#008000",
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
          <button style={clockOutStyle} className={"btn btn-warning"} onClick={this.props.func2}>Clock out</button>
          <button style={breakStyle} className={"btn btn-primary"} onClick={this.props.func3}>{breakText}</button>
          <button style={breakStyle} className={"btn btn-primary"} onClick={this.props.func3}>{this.props.breakTime}</button>
          <button style={indicatorStyle} className={"btn flex-right ml-auto p-2 bd-highlight"}>{clockInIndicator}</button>
      </div>
      
    )
  }
}

export default Button