// var converter = (number) =>{
//     var rawHour = number/60/60
//     var rawMin = number/60
//     var rawSec = number

//     var hours = Math.floor(rawHour)
//     var minutes = Math.floor((rawHour-hours)*60)
//     var seconds = Math.round((((rawHour-hours)*60)-minutes)*60)



//     return `${hours}:${minutes}:${seconds}`
// }

var converter = {
    toTime (number){
        var rawHour = number/60/60
        var rawMin = number/60
        var rawSec = number
    
        var hours = Math.floor(rawHour)
        var minutes = Math.floor((rawHour-hours)*60)
        var seconds = Math.round((((rawHour-hours)*60)-minutes)*60)
    
            if(hours<10){
                hours = `0${hours}`
            }
            if(minutes<10){
                minutes = `0${minutes}`
            }
            if(seconds<10){
                seconds = `0${seconds}`
            }

    
        return `${hours}:${minutes}:${seconds}`
    },
    objtoTime(){

    },
    toInt(time) {
        var H = parseInt(time.slice(0,2))
        var M = parseInt(time.slice(3,5))
        var S = parseInt(time.slice(6))

        var hours = H
        var minutes = M
        var seconds = S

        var time = hours*60*60+minutes*60+seconds


        return time
    }
}

console.log(converter.toInt("01:01:01"))

module.exports = converter