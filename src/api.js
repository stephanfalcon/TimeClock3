const axios = require("axios")
var api = {
    apiCall(cb) {
        axios.get("https://timeclockapi.herokuapp.com/clocklog")
        .then((res)=>{
            cb(res.data.docs.reverse())
        })
        .catch((err)=>{
            return(err)
        })
    },

    apiPost(entry,cd) {
        console.log("this function works")
        axios.post("https://timeclockapi.herokuapp.com/clocklog",{
            clockInTime:entry.clockInDisplay,
            clockOutTime:entry.currentDisplay,
            timePassed:entry.timePassed,
            date:entry.date,
            note:entry.note
        })
        // axios.post("https://timeclockapi.herokuapp.com/clocklog",shift)
        .then((res)=>{
            console.log(res)
            api.apiCall((entries)=>{
                cd(entries)
            })
        })
        .catch((err)=>{
            console.log(err)
        })

    },
    
    apiDelete(event,cd) {
        var id = event.target.dataset.id
        axios.delete(`https://timeclockapi.herokuapp.com/clocklog/${id}`)
        .then((res)=>{
            console.log(res)
            api.apiCall((entries)=>{
                cd(entries)
            })
            
        })
        .catch((err)=>{
            console.log(err)
        })
    },

    apiEdit(event,cd) {
        let id = event.target.dataset.id
        let newValue = event.target.value
    
        console.log(id,newValue)
    
    
        axios.put(`https://timeclockapi.herokuapp.com/clocklog/${id}`,{
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
    
    }
}

module.exports = api