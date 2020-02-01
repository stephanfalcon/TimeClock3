import React, { Component } from 'react';
import Time from "./time"
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
      clockedIn: false

    }
  }  
  //starts ticking for current time
  componentDidMount(){
    this.startTimer()
    this.apiCall()

  }

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
      this.timeDiff()
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

  //function to tell time difference
  timeDiff = () => {
    //setting up current time and clock in time
    var cH = parseInt(this.state.currentTime.slice(0,2))
    var cM = parseInt(this.state.currentTime.slice(3,5))
    var cS = parseInt(this.state.currentTime.slice(6))

    var clH = parseInt(this.state.clockInTime.slice(0,2))
    var clM = parseInt(this.state.clockInTime.slice(3,5))
    var clS = parseInt(this.state.clockInTime.slice(6))

    // console.log(this.state.currentTime)
    // console.log(this.state.clockInTime)
    // console.log(cH,cM,cS)
    var tph,tpm,tps
    
    //makes it so time passed is not negative, then suptracts
    //to give time difference
    tph = cH-clH
    if (cM<clM){
      tph -= 1
      tpm = 60-clM+cM
    }else{
      tpm = cM-clM
    }
    if (cS<clS){
      tpm -= 1
      tps = 60-clS+cS
    }else{
      tps = cS-clS
    }
    
    
    // adds 0 to single digits for asthestics
    if(tph<10){
      tph = `0${tph}`
    }
    if(tpm<10){
      tpm = `0${tpm}`
    }
    if(tps<10){
      tps = `0${tps}`
    }

    // sets state of time passed
    this.setState({timePassed:`${tph}:${tpm}:${tps}`})

    // yeah exactly what it looks like
    if(this.state.clockInTime==="00:00:00"){
      this.setState({timePassed:"00:00:00"})
    }
  }
  


  render(){
    return(
      <div className={"container"}>
        
        <h1>Time clock</h1>
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