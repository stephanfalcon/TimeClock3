//v0.5.1
import React, { Component } from 'react';
import Time from "./time"
import timeDiff from "./timediff"
import timeConverter from "./timeConverter"
import api from "./api"
import timeAdd from "./timeAdd"

import axios from "axios"

import Clock from "./components/clock/clock"
import Button from "./components/button/button"
import Log from "./components/log/log"
import Text from "./components/text/text"

class App extends Component{
  constructor(){
    super()
    this.state = {

      date:"",

      // in standard
      currentDisplay:"00:00:00",
      clockInDisplay:"00:00:00",

      //in military
      currentTime:"00:00:00",
      clockInTime:"00:00:00",
      timePassed:"00:00:00",

      breakStart:"00:00:00",
      breakTime:"00:00:00",
      onBreak:false,


      note:"",
      logs:[],
      logLoaded:false,
      clockedIn: false,
      indicator:""

    }
  }  
  //starts ticking for current time
  componentDidMount(){    
    this.startTimer()
    api.apiCall((entries)=>{
      this.setState({logs:entries})
    })
  }

  //starts time ticking for current time 
  startTimer = ()=>{
    var timeint = setInterval(() => {
      var time = new Time()
      this.setState({
        currentTime:time.military.time,
        currentDisplay:time.time.time,
        date:time.calendar,
        note:document.getElementsByClassName("text")[0].value
      })
      this.setState({timePassed:timeDiff(this.state.currentTime,this.state.clockInTime,this.state.breakTime)})
      // this.setState({timePassed:timeDiff(this.state.timePassed,this.state.breakTime)})

    }, 1000);

    var breakint  = setInterval(() => {
      if(this.state.clockedIn==true){
        this.breakCheck()
      }

    }, 1000);
  }


  // records current time to subtract difference from
  clockIn = () => {
    if(this.state.clockedIn === false){
      var clockIn = new Time()
      this.setState({
        clockInTime:clockIn.military.time,
        clockInDisplay:clockIn.time.time,
        clockedIn:true
      })

    }else{
      alert("You are already clocked in")
    }
  }

  clockOut = () => {
    if(this.state.clockedIn === true){
      api.apiPost({
        clockInDisplay:this.state.clockInDisplay,
        currentDisplay:this.state.currentDisplay,
        timePassed:this.state.timePassed,
        date:this.state.date,
        note:this.state.note
      },(entries)=>{
        this.setState({logs:entries})
      })
      
      this.setState({
        clockedIn:false,
        clockInDisplay:"00:00:00",
        clockInTime:"00:00:00",
        timePassed:"00:00:00",
        breakTime:"00:00:00",
        note:""
      })
      document.getElementsByClassName("text")[0].value = ""
    }else {
      alert("You are not clocked in")
    }
  }

  //activates break mode
  //
  break = () =>{  
    if(this.state.clockedIn){
      if(this.state.onBreak==true){
  
        console.log("you are now off break")
        this.setState({onBreak:false})
      }else{
        this.setState({breakStart:this.state.currentTime})
        console.log("your are now on break")
        
        this.setState({onBreak:true})
      }

    }
  }

  breakCheck= () =>{
    if(this.state.onBreak==true){
      // this.setState({breakTime:this.state.breakTime+1})
      // this.setState({breakTime:timeDiff(this.state.currentTime,this.state.breakStart)})
      
      this.setState({breakTime:timeAdd(this.state.breakTime)})
      // this.setState({timePassed:timeDiff(this.state.timePassed,this.state.breakTime)})
      // console.log(`timediff for time passed: ${timeDiff(this.state.breakStart,this.state.timePassed)}`)
      console.log(`
      break start: ${this.state.breakStart}
current time: ${this.state.currentTime}
break time: ${this.state.breakTime}
timepassed:${this.state.timePassed}`)
    }else{
      return
    }
  }

  focus = () => {
    console.log("this has focus")
  }

  offFocus = (event) => {
    console.log("this has lost focus")
    api.apiEdit(event,(entries)=>{
      this.setState({logs:entries})
    })
  }

  delete = (event) => {
    api.apiDelete(event,(entries)=>{
      this.setState({logs:entries})
    })
  }

  render(){
    return(
      <div className={"container"}>

        <h1>Time clock </h1>
        
        <div className={"container"}>
          <Button func1={this.clockIn} func2={this.clockOut} func3={this.break} clockedIn={this.state.clockedIn} breakTime={this.state.breakTime} onBreak={this.state.onBreak}/>
        </div>

        <div className={"row"}>
          <Clock title={"Current time:"} time={this.state.currentDisplay}/>
          <Clock title={"Clocked in:"} time={this.state.clockInDisplay} />
          <Clock title={"Time passed:"} time={this.state.timePassed}/>
        </div>
        {/* notes go here */}
        <Text></Text>
        <Log entries={this.state.logs} function={this.delete} focus={this.focus} offFocus={this.offFocus} />
      </div>
    )
  }
}

export default App