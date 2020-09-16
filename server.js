const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const bodyparser = require("body-parser")
const session = require("express-session")
const axios = require("axios")
const cors = require("cors")
const morgan = require("morgan");
const user = require('../timeClockAPI/models/user');
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
const api = require("./routes")

app.use(cors())
app.use(morgan({}))
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(passport.initialize())
app.use(session(
  {
    secret: 'poop',
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite:"lax"
    },
    passport:{
      user:""
    }
    
  }
))
app.use("/api",api)

var apiUrl
var appUrl

if(process.env.PATH == `C:\\Program Files\\Git\\mingw64\\bin;C:\\Program Files\\Git\\usr\\bin;C:\\Users\\hp\\bin;C:\\Windows\\system32;C:\\Windows;C:\\Windows\\System32\\Wbem;C:\\Windows\\System32\\WindowsPowerShell\\v1.0;C:\\Program Files (x86)\\Intel\\OpenCL SDK\\2.0\\bin\\x86;C:\\Program Files (x86)\\Intel\\OpenCL SDK\\2.0\\bin\\x64;C:\\Program Files\\nodejs;C:\\Program Files\\MongoDB\\Server\\4.0\\bin;C:\\Program Files\\Git\\cmd;C:\\Users\\hp\\AppData\\Local\\Programs\\Microsoft VS Code\\bin;C:\\Program Files\\heroku\\bin;C:\\Users\\hp\\AppData\\Roaming\\npm`){
  apiUrl = "http://localhost:3001"
  appUrl = "http://localhost:8080"
}else{
  apiUrl = "https://timeclockapi.herokuapp.com"
  appUrl = "https://timeclock03.herokuapp.com"
}
console.log(process.env.PUBLIC_URL)
console.log(apiUrl)


// app.use((req,res,next)=>{
//   console.log(req.session)
//   next()
// })


passport.use(new LocalStrategy((username, password, done)=>{
  var users

  axios.get(`${apiUrl}/user`)
  .then((data)=>{
    users = data.data.docs
    // console.log(users.data.docs)

    var authent = users.find((element)=> element.username==username)

    console.log(authent)

    if(authent!=undefined){
      if(authent.password!=password){
        return done(null,false,{message:"incorrect password"})
      }
      return done(null,authent)
    }

    
  })
  .catch((err)=>{
    console.log(err)
  })
}))

passport.serializeUser(function(user, done) {
  console.log(user)
  done(null, user._id);
});

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });

// ---------------react app ------------

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/home', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// ------------login-----------

app.get('/login',(req,res)=>{
  res.sendFile( __dirname +"/public/login.html")
})

app.post('/login',passport.authenticate("local",{
  failureRedirect:"/login"
}),(req,res)=>{
  res.redirect('/home')
})

app.get('/session',cors(),(req,res)=>{
  console.log(req.session)
  res.json(req.session.passport.user)
})


//---------register----------------

app.get('/register',(req,res)=>{
  res.sendFile(__dirname + "/public/register.html")
})

app.post('/register',(req,res)=>{
  axios.post(`${apiUrl}/user/register`,req.body)
  .then((data)=>{
    res.json(data.data)
  })
  .catch((err)=>{
    res.json(err)
  })
})

// ---------delete---------

app.delete('/delete',(req,res)=>{
  axios.post(`${apiUrl}/user/delete`,req.body._id)
  .then((data)=>{
    res.json(data.data)
  })
  .catch((err)=>{
    res.json(err)
  })
})

//---------------privacy----------

app.get('/privacy', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'privacy.html'));
});

app.listen(port,()=>{
  console.log("listening on port " + port)
});