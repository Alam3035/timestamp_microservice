// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const { json } = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/", (req, res) => {
  jsonResponse = {unix: 0, utc: ""}
  currentDate = new Date()
  jsonResponse.unix = currentDate.getTime()
  jsonResponse.utc = currentDate.toUTCString()
  res.json(jsonResponse);
});

app.get('/api/timestamp/:date', (req, res) => {
  jsonResponse = {unix: 0, utc: ""}
  newDate = req.params.date

  if (/\d{5,}/.test(newDate)) {
    const dateInt = parseInt(newDate);
    jsonResponse.unix = dateInt;
    jsonResponse.utc = new Date(dateInt).toUTCString();
    res.json(jsonResponse);
  } else {
    let dateObject = new Date(newDate);
    if (dateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    }
    jsonResponse.unix = dateObject.valueOf();
    jsonResponse.utc = dateObject.toUTCString();
    res.json(jsonResponse);
    
  }
})


// listen for requests :)
var listener = app.listen("3000", function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
