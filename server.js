const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
const passport = require("passport")
const bodyparser = require("body-parser")

// the __dirname is the current directory from where the script is running


app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.use(bodyparser.urlencoded({extended:false}))

app.use(bodyparser.json())

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

  
app.get('/privacy', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'privacy.html'));
});

app.listen(port);