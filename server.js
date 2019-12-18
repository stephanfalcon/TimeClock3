const express = require("express")

const port = process.env.PORT|| 3001

const app = express()

app.use(express.static("public"))

app.get("/",(req,res)=>{
    res.send("hello there")
    console.log("hello there")
})

app.listen(port,()=> {
    console.log(`listening on port ${port}`)
})
