import React, { Component } from 'react';
import "./log.css"

class Log extends Component{


  render(){
    return(
        <div>
            <h3>log</h3>
            <div>
                {this.props.entries.map((entry)=>{
                    return(
                    <div className={"row log-div"}>
                        <h5 className={"col-lg-3"}>{entry.timePassed}</h5>
                        <h5 className={"col-lg-3"}>{entry.clockInTime}</h5>
                        <h5 className={"col-lg-3"}>{entry.clockOutTime}</h5>
                        <h5 className={"col-lg-3"}>{entry.note}</h5>
                    </div>      
                    )
                })}
            </div>
        </div>
    )
  }
}

export default Log