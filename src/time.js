class Time {     
    constructor(){
        this.date = new Date()

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
            this.hours = `0${this.hours}`
        }
        if(this.minutes<10){
            this.minutes = `0${this.minutes}`
        }
        if(this.seconds<10){
            this.seconds = `0${this.seconds}`
        }
        
        this.time = `${this.hours}:${this.minutes}:${this.seconds}`
        this.military = `${this.mHours}:${this.minutes}:${this.seconds}`
    }
}

export default Time