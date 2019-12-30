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
                    <div className={"row log-div"} key={entry._id}>
                        <h5 className={"col-lg-2"}>{entry.clockInTime}</h5>
                        <h5 className={"col-lg-2"}>{entry.clockOutTime}</h5>
                        <h5 className={"col-lg-2"}>{entry.timePassed}</h5>
                        <h5 className={"col-lg-5"}>{entry.note}</h5>
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