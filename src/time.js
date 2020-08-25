class Time {     
    constructor(){
        this.date = new Date()

        this.year = this.date.getFullYear()
        this.month = this.date.getMonth()
        this.day = this.date.getDate()

        this.DotW = this.date.getDay()

        this.hours = this.date.getHours()
        this.minutes = this.date.getMinutes()
        this.seconds = this.date.getSeconds()
        this.mHours = this.date.getHours()

        if(this.hours > 12){
            this.hours -= 12
        }
        if(this.mHours<10){
            this.mHours = `0${this.mHours}`
        }
        if(this.hours<10){
            if(this.hours == 0 ){
                this.hours = 12
            }else{
                this.hours = `0${this.hours}`
            }
            
        }
        if(this.minutes<10){
            this.minutes = `0${this.minutes}`
        }
        if(this.seconds<10){
            this.seconds = `0${this.seconds}`
        }
        
        this.military = {
            hours:this.mHours,
            minutes:this.mMinutes,
            seconds:this.mSeconds,
            time:`${this.mHours}:${this.minutes}:${this.seconds}` 
        }

        this.time = {
            hours:this.hours,
            minutes:this.minutes,
            seconds:this.seconds,
            time:`${this.hours}:${this.minutes}:${this.seconds}` 
        }

        this.calendar = `${1+this.month}/${this.day}/${this.year}`

    }
}

export default Time