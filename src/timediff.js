var timeDiff = (currentTime,clockinTime,breakTime="00:00:00") => {
    //setting up current time and clock in time
    var currentH = parseInt(currentTime.slice(0,2))
    var currentM = parseInt(currentTime.slice(3,5))
    var currentS = parseInt(currentTime.slice(6))
    
    var clockInH = parseInt(clockinTime.slice(0,2))
    var clockInM = parseInt(clockinTime.slice(3,5))
    var clockInS = parseInt(clockinTime.slice(6))

    var breakH = parseInt(breakTime.slice(0,2))
    var breakM = parseInt(breakTime.slice(3,5))
    var breakS = parseInt(breakTime.slice(6))

    var timepassedH = 0,timepassedM = 0,timepassedS = 0
    
    var timePassed
    
    //makes it so time passed is not negative, then suptracts
    //to give time difference

    timepassedH = currentH-clockInH
    if (currentM<clockInM){
        timepassedH -= 1
        currentM += 60
        timepassedM = currentM-clockInM
    }else{
        timepassedM = currentM-clockInM
    }
    if (currentS<clockInS){
        timepassedM -= 1
        currentS += 60
        timepassedS = currentS-clockInS
    }else{
        timepassedS = currentS-clockInS
    }
    
    timepassedH = timepassedH-breakH
    if (timepassedM<breakM){
        timepassedH -= 1
        timepassedM += 60
        timepassedM = timepassedM-breakM
    }else{
        timepassedM = timepassedM-breakM
    }
    if (timepassedS<breakS){
        timepassedM -= 1
        timepassedS += 60
        timepassedS = timepassedS-breakS
    }else{
        timepassedS = timepassedS-breakS
    }

    
    // adds 0 to single digits for asthestics
    if(timepassedH<10){
        timepassedH = `0${timepassedH}`
    }
    if(timepassedM<10){
        timepassedM = `0${timepassedM}`
    }
    if(timepassedS<10){
        timepassedS = `0${timepassedS}`
    }
    
    
    // if you arent clocked in does not set time passed timer
    timePassed = `${timepassedH}:${timepassedM}:${timepassedS}`
    if(clockinTime==="00:00:00"){
            timePassed = "00:00:00"
        }
        
    
    return timePassed
}

console.log(timeDiff("03:00:30","01:30:00","00:00:31"))

module.exports = timeDiff