const converter = require("./timeConverter")

var addTime = (number) => {


    var time = converter.toInt(number)
    time++
    
    return converter.toTime(time)

}

module.exports = addTime

