import React, { Component } from 'react';
import "./clock.css"

class Clock extends Component{


  render(){
    return(
      <div className={"col-lg-4 "}>
        <div className={"container clock"}>
          <h3 className={""}>{this.props.title}</h3>
          <h3>{this.props.time}</h3>
        </div>
      </div>
    )
  }
}

export default Clock