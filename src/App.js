import React, { Component } from 'react';
import Time from "./time"
import axios from "axios"

import Clock from "./components/clock/clock"
import Button from "./components/button/button"
import Log from "./components/log/log"

class App extends Component{
  constructor(){
    super()
    this.state = {
      // in standard
      currentDisplay:"00:00:00",
      clockInDisplay:"00:00:00",

      //in military
      currentTime:"00:00:00",
      clockInTime:"00:00:00",
      timePassed:"00:00:00",
      logs:[]

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
      this.setState({currentTime:time.military})
      this.setState({currentDisplay:time.time})
      this.timeDiff()
      // console.log(this.state)

    }, 1000);
  }


  // records current time to subtract difference from
  clockIn = () => {
    var clockIn = new Time()
    this.setState({clockInTime:clockIn.military})
    this.setState({clockInDisplay:clockIn.time})
  }

  apiPost = () => {
    var shift = {
      clockInTime:this.state.clockInTime,
      clockOutTime:this.state.currentTime,
      timePassed:this.state.timePassed,
      note:"this is only a test"
    }
    console.log("this function works")
    axios.post("https://timeclockapi.herokuapp.com/clocklog",{
      clockInTime:this.state.clockInTime,
      clockOutTime:this.state.currentTime,
      timePassed:this.state.timePassed,
      note:"this is only a test"
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
          <Button func1={this.clockIn} func2={this.apiPost}/>
        </div>

        <div className={"row"}>
          <Clock title={"Current time:"} time={this.state.currentDisplay}/>
          <Clock title={"Clocked in:"} time={this.state.clockInDisplay} />
          <Clock title={"Time passed:"} time={this.state.timePassed}/>
        </div>
        <Log entries={this.state.logs} function={this.apiDelete}/>
      </div>
    )
  }
}

export default App