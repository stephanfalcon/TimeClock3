import React, { Component } from 'react';
import Time from "./time"
import timeDiff from "./timediff"

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
    this.apiCall()

  }

  //starts time ticking for current time 
  startTimer = ()=>{
    setInterval(() => {
      var time = new Time()
      this.setState({
        currentTime:time.military,
        currentDisplay:time.time,
        date:time.calendar,
        note:document.getElementsByClassName("text")[0].value
      })
      this.setState({})
      this.setState({timePassed:timeDiff(this.state.currentTime,this.state.clockInTime)})
    }, 1000);
  }


  // records current time to subtract difference from
  clockIn = () => {
    if(this.state.clockedIn === false){
      var clockIn = new Time()
      this.setState({
        clockInTime:clockIn.military,
        clockInDisplay:clockIn.time,
        clockedIn:true
      })

    }else{
      alert("You are already clocked in")
    }
  }

  clockOut = () => {
    if(this.state.clockedIn === true){
      this.apiPost()
      
      this.setState({
        clockedIn:false,
        clockInDisplay:"00:00:00",
        clockInTime:"00:00:00",
        timePassed:"00:00:00",
        note:""
      })
      document.getElementsByClassName("text")[0].value = ""
    }else {
      alert("You are not clocked in")
    }
  }

  apiPost = () => {
    console.log("this function works")
    axios.post("https://timeclockapi.herokuapp.com/clocklog",{
      clockInTime:this.state.clockInDisplay,
      clockOutTime:this.state.currentDisplay,
      timePassed:this.state.timePassed,
      date:this.state.date,
      note:this.state.note
    })
    // axios.post("https://timeclockapi.herokuapp.com/clocklog",shift)
    .then((res)=>{
      console.log(res)
      this.apiCall()
    })
    .catch((err)=>{
      console.log(err)
    })
    
  }

  apiCall = () => {
    axios.get("https://timeclockapi.herokuapp.com/clocklog")
    .then((res)=>{
      this.setState({logs:res.data.docs.reverse()})
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  apiDelete = (event) =>{
    var id = event.target.dataset.id
    axios.delete(`https://timeclockapi.herokuapp.com/clocklog/${id}`)
    .then((res)=>{
      console.log(res)
      this.apiCall()
    })
    .catch((err)=>{
      console.log(err)
    })
    
  }

  apiEdit = (event) => {
    let id = event.target.dataset.id
    let newValue = event.target.value

    console.log(id,newValue)


    axios.put(`https://timeclockapi.herokuapp.com/clocklog/${id}`,{
      note:newValue
    })
    .then((res)=>{
      console.log(res)
      this.apiCall()
    })
    .catch((err)=>{
      console.log(err)
    })

  }

  focus = () => {
    console.log("this has focus")
  }

  offFocus = (event) => {
    console.log("this has lost focus")
    this.apiEdit(event)
  }

  render(){
    return(
      <div className={"container"}>

        <h1>Time clock </h1>
        
        <div className={"container"}>
          <Button func1={this.clockIn} func2={this.clockOut} clockedIn={this.state.clockedIn}/>
        </div>

        <div className={"row"}>
          <Clock title={"Current time:"} time={this.state.currentDisplay}/>
          <Clock title={"Clocked in:"} time={this.state.clockInDisplay} />
          <Clock title={"Time passed:"} time={this.state.timePassed}/>
        </div>
        {/* notes go here */}
        <Text></Text>
        <Log entries={this.state.logs} function={this.apiDelete} focus={this.focus} offFocus={this.offFocus}/>
      </div>
    )
  }
}

export default App