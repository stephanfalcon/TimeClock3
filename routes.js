const express = require("express")
const router = express.Router()

const axios = require("axios")
var apiUrl
var appUrl

if(process.env.PATH == 'C:\\Program Files\\Git\\mingw64\\bin;C:\\Program Files\\Git\\usr\\bin;C:\\Users\\hp\\bin;C:\\Windows\\system32;C:\\Windows;C:\\Windows\\System32\\Wbem;C:\\Windows\\System32\\WindowsPowerShell\\v1.0;C:\\Program Files (x86)\\Intel\\OpenCL SDK\\2.0\\bin\\x86;C:\\Program Files (x86)\\Intel\\OpenCL SDK\\2.0\\bin\\x64;C:\\Program Files\\nodejs;C:\\Program Files\\MongoDB\\Server\\4.0\\bin;C:\\Program Files\\Git\\cmd;C:\\Users\\hp\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Program Files\\heroku\\bin;C:\\Users\\hp\\AppData\\Roaming\\npm'){
  apiUrl = "http://localhost:3001"
}else{
  apiUrl = "https://timeclockapi.herokuapp.com"
}

router.get("/:userId",(req,res)=>{

    console.log("route hit")
    axios.get(`${apiUrl}/clocklog/${req.params.userId}`)
    .then((data)=>{
        res.json(data.data.docs.reverse())
    })
    .catch((err)=>{
        return(err)
    })
})

router.post("/",(req,res)=>{
    console.log("this function works")
    axios.post(`${apiUrl}/clocklog`,{
        clockInTime:req.body.clockInTime,
        clockOutTime:req.body.clockOutTime,
        timePassed:req.body.timePassed,
        date:req.body.date,
        userId:req.body.userId,
        note:req.body.note
    })
    .then((data)=>{
        console.log(data)
        res.json(data)
    })
    .catch((err)=>{
        console.log(err)
        res.json(err)
    })
})

router.delete("/:id",(req,res)=>{
    axios.delete(`${apiUrl}/clocklog/${req.params.id}`)
    .then((data)=>{
        console.log(data)
        res.json(data)
    })
    .catch((err)=>{
        console.log(err)
        res.json(data)
    })
})

router.put("/",(req,res)=>{
    let id = event.target.dataset.id
    let newValue = event.target.value

    console.log(id,newValue)


    axios.put(`${apiUrl}/clocklog/${id}`,{
        note:newValue
    })
    .then((res)=>{
        console.log(res)
        api.apiCall((entries)=>{
            cd(entries)
        })
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.get("/session",(req,res)=>{
    axios.get(`/session`)
    .then((data)=>{
        cb(data.data)
    })
})

module.exports = router




// var api = {
//     // /get
//     apiCall(userId,cb) {
//         axios.get(`${apiUrl}/clocklog/${userId}`)
//         .then((res)=>{
//             cb(res.data.docs.reverse())
//         })
//         .catch((err)=>{
//             return(err)
//         })
//     },
//     // /post
//     apiPost(entry,cd) {
//         console.log("this function works")
//         axios.post(`${apiUrl}/clocklog`,{
//             clockInTime:entry.clockInDisplay,
//             clockOutTime:entry.currentDisplay,
//             timePassed:entry.timePassed,
//             date:entry.date,
//             note:entry.note
//         })
//         // axios.post("https://timeclockapi.herokuapp.com/clocklog",shift)
//         .then((res)=>{
//             console.log(res)
//             api.apiCall((entries)=>{
//                 cd(entries)
//             })
//         })
//         .catch((err)=>{
//             console.log(err)
//         })

//     },
//     // /delete
//     apiDelete(event,cd) {
//         var id = event.target.dataset.id
//         axios.delete(`${apiUrl}/clocklog/${id}`)
//         .then((res)=>{
//             console.log(res)
//             api.apiCall((entries)=>{
//                 cd(entries)
//             })
            
//         })
//         .catch((err)=>{
//             console.log(err)
//         })
//     },

//     //put
//     apiEdit(event,cd) {
//         let id = event.target.dataset.id
//         let newValue = event.target.value
    
//         console.log(id,newValue)
    
    
//         axios.put(`${apiUrl}/clocklog/${id}`,{
//           note:newValue
//         })
//         .then((res)=>{
//             console.log(res)
//             api.apiCall((entries)=>{
//                 cd(entries)
//             })
//         })
//         .catch((err)=>{
//           console.log(err)
//         })
//     },
//     // get /sessoin
//     sessionCall(cb) {

//         axios.get(`/session`)
//         .then((data)=>{
//             cb(data.data)
//         })

//     }
// }

// module.exports = api