const express = require('express')

const app = express()

const port = process.env.port = 3001

if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));
};

app.listen(port,()=>{
    console.log(`running on port ${port}`)
})