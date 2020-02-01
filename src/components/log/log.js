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
                        <div className={'col-lg-2'}><h5 className={"item"}>In: {entry.clockInTime}</h5></div>
                        <div className={'col-lg-2'}><h5 className={"item"}>Out: {entry.clockOutTime}</h5></div>
                        <div className={'col-lg-2'}><h5 className={"item"}>Passed: {entry.timePassed}</h5></div>
                        <div className={'col-lg-2'}><h5 className={"item"}>Date: {entry.date}</h5></div>
                        <div className={'col-lg-3'}><input className={"item note"} data-id={entry._id} onClick={this.props.edit} defaultValue={entry.note} onFocus={this.props.focus} onBlur={this.props.offFocus}></input></div>
                        <div className={'col-lg-1'}>
                            <button data-id={entry._id} className={"delete col-lg-12"} onClick={this.props.function}>
                                <h5 data-id={entry._id} className={"delete-text"}>X</h5>
                            </button>
                        </div>
                    </div>      
                    )
                })}
            </div>
        </div>
    )
  }
}

export default Log