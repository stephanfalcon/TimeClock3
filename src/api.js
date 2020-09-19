const axios = require("axios")
var apiUrl
var appUrl

console.log("env: "+process)
if(process.env.PATH == 'C:\\Program Files\\Git\\mingw64\\bin;C:\\Program Files\\Git\\usr\\bin;C:\\Users\\hp\\bin;C:\\Windows\\system32;C:\\Windows;C:\\Windows\\System32\\Wbem;C:\\Windows\\System32\\WindowsPowerShell\\v1.0;C:\\Program Files (x86)\\Intel\\OpenCL SDK\\2.0\\bin\\x86;C:\\Program Files (x86)\\Intel\\OpenCL SDK\\2.0\\bin\\x64;C:\\Program Files\\nodejs;C:\\Program Files\\MongoDB\\Server\\4.0\\bin;C:\\Program Files\\Git\\cmd;C:\\Users\\hp\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Program Files\\heroku\\bin;C:\\Users\\hp\\AppData\\Roaming\\npm'){
  apiUrl = "http://localhost:3001"
  appUrl = "http://localhost:8080"
}else{
  apiUrl = "https://timeclockapi.herokuapp.com"
  appUrl = "https://timeclock03.herokuapp.com"
}

var api = {
    apiCall(userId,cb) {
        if(userId==""){
            alert("please sign in to record your times")
        }else{
            axios.get(`/api/${userId}`)
            .then((res)=>{
                cb(res.data)
            })
            .catch((err)=>{
                return(err)
            })            
        }


    },

    apiPost(entry,cb) {
        axios.post(`/api`,{
            clockInTime:entry.clockInDisplay,
            clockOutTime:entry.currentDisplay,
            timePassed:entry.timePassed,
            date:entry.date,
            userId:entry.userId,
            note:entry.note
        })
        .then((res)=>{
            cb(res.data)
        })
        .catch((err)=>{
        })

    },
    
    apiDelete(event,cb) {
        var id = event.target.dataset.id
        axios.delete(`${apiUrl}/clocklog/${id}`)
        .then((res)=>{
            cb(res.data)
        })
        .catch((err)=>{
        })
    },

    apiEdit(event) {
        let id = event.target.dataset.id
        let newValue = event.target.value
    
        console.log(id,newValue)
    
    
        axios.put(`${apiUrl}/clocklog/${id}`,{
          note:newValue
        })
        .then((res)=>{
        })
        .catch((err)=>{
        })
    },
    sessionCall(cb) {

        axios.get(`/session`)
        .then((data)=>{
            cb(data.data)
        })

    }
}

module.exports = api