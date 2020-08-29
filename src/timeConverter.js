var converter = (number) =>{
    var rawHour = number/60/60
    var rawMin = number/60
    var rawSec = number

    var hours = Math.floor(rawHour)
    var minutes = Math.floor((rawHour-hours)*60)
    var seconds = Math.round((((rawHour-hours)*60)-minutes)*60)



    return `${hours}:${minutes}:${seconds}`
}

console.log(converter(7065))

module.exports = converter