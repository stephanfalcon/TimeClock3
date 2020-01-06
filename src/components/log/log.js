import React, { Component } from 'react';
import "./log.css"

class Log extends Component{


    componentDidMount(){
        console.log("loaded")
    }

  render(){
    return(
        <div className={"log-container col-lg-12"}>
            <h3 className={"title"}>log</h3>
            <div>
                {this.props.entries.map((entry)=>{
                    return(
                    <div className={"row log-div"} key={entry._id}>
                        <h5 className={"col-lg-2 item"}>In: {entry.clockInTime}</h5>
                        <h5 className={"col-lg-2 item"}>Out: {entry.clockOutTime}</h5>
                        <h5 className={"col-lg-2 item"}>Passed: {entry.timePassed}</h5>
                        <h5 className={"col-lg-2 item"}>Date: {entry.date}</h5>
                        <h5 className={"col-lg-3 item"}>{entry.note}</h5>
                        <button data-id={entry._id} className={"delete btn col-lg-1"} onClick={this.props.function}>
                            <h5 data-id={entry._id} className={"delete-text"}>X</h5>
                        </button>
                    </div>      
                    )
                })}
            </div>
        </div>
    )
  }
}

export default Log