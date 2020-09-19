import React, { Component } from 'react';
import "./button.css"


class Button extends Component{
  constructor(props){
    super(props)
    this.clockInText = ''

    this.breakIndicator = this.props.onBreak
    this.breakText = ""
    this.breakStyle = {}

    this.clockInStyle = {
      background:"#048def",
      borderWidth:"0px",
      borderRadius:"5px"
    }
    this.clockOutStyle = {
      background:"#8c7304",
      borderWidth:"0px",
      borderRadius:"5px"
    }
    this.indicatorStyle = {
      background:"#7F0000",
      borderWidth:"0px",
      borderRadius:"5px",
      olor:"white"
    }
    this.breakStyle = {
      background:"green",
      borderWidth:"0px",
      borderRadius:"5px",
      width:"10px"
    }


  }

  userButtons = () => {
    return(
      <div className={"row buttons"}>
        <button style={this.clockInStyle} className={"btn btn-primary"} onClick={this.props.func1}>Clock in</button>
        <button style={this.clockOutStyle} className={"btn btn-warning"} onClick={this.props.func2}>Clock out</button>
        <button style={this.breakStyle} className={"btn btn-primary"} onClick={this.props.func3}>{this.breakText}</button>
        <button style={this.breakStyle} className={"btn btn-primary"} onClick={this.props.func3}>{this.props.breakTime}</button>
        <button style={this.indicatorStyle} className={"btn flex-right ml-auto p-2 bd-highlight"}>{this.clockInText}</button>
      </div>
    )
  }

  guestButtons = () => {
    return(
      <div className={"row buttons"}>
        <a href={"/login"}><button className={"btn btn-primary"}>sign in </button></a>
        <a href={"/register"}><button className={"btn btn-success"}>sign up</button></a>
      </div>
    )
  }

  buttons = () => {
    if(this.props.loggedIn == true){
      return <this.userButtons />
    }else{
      return <this.guestButtons />
    }
  }

  render(){
    if (this.props.clockedIn === true){
      this.clockInText = "Clocked in"
      this.clockInStyle = {
        background:"#01497c",
        borderWidth:"0px",
        borderRadius:"5px"
      }      
      this.clockOutStyle = {
        background:"#edc204",
        borderWidth:"0px",
        borderRadius:"5px"
      }
      this.indicatorStyle = {
        background:"#008000",
        borderWidth:"0px",
        borderRadius:"5px",
        color:"black"
      }
    }else{
      this.clockInText = "Clocked out"
      this.clockInStyle = {
        background:"#048def",
        borderWidth:"0px",
        borderRadius:"5px"
      }
      this.clockOutStyle = {
        background:"#8c7304",
        borderWidth:"0px",
        borderRadius:"5px"
      }
      this.indicatorStyle = {
        background:"#7F0000",
        borderWidth:"0px",
        borderRadius:"5px",
        color:"white"
      }
    }

    if (this.props.onBreak === true){
      this.breakText = "ON BREAK"
      this.breakStyle = {
        background:"red",
        borderWidth:"0px",
        borderRadius:"5px"
      }
    }else{
      this.breakText = "OFF BREAK"
      this.breakStyle = {
        background:"green",
        borderWidth:"0px",
        borderRadius:"5px"
      }
    }


    return(
      <this.buttons/>
    )
  }
}

export default Button