const express = require('express');
const path    = require('path');
const request = require('request');

const app = express();

// Render index.html

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

// Index.html requirements

app.use('/lib', express.static(__dirname + '/lib'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

// Keys

var client_id = '1781c6c33491424f802591ae3b3f1559';
var client_secret = '7ff5306f33f4435d80c461b80db3ad6f';

// Auth Setup

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: { grant_type: 'client_credentials' },
  json: true
};

// Spotify Web API Client Credentials Auth + Request

app.get('/cors', function (req, res) {
  const url = req.query.url;

  request.post(authOptions, (postErr, postResponse, tokenBody) => {
    if (tokenBody.error) {
      console.log("in error");
      console.log("postErr");
      console.log(postErr);
      console.log("postResponse");
      console.log(postResponse);
      console.log("tokenBody");
      console.log(tokenBody);
      console.log("in error");
      res.status(422).send(`Error with token! Try again!`);
    } else {
      console.log("in else");
      console.log("postErr");
      console.log(postErr);
      console.log("postResponse");
      console.log(postResponse);
      console.log("tokenBody");
      console.log(tokenBody);
      console.log("in else");
      var token = tokenBody.access_token;
      var options = {
        url: url,
        headers: { 'Authorization': 'Bearer ' + token },
        json: true
      };

      request.get(options, (getErr, getRes, getBody) => {
        res.send(getBody);
      });
    }
  });
});


// Server Start

const port = (process.env.PORT || 8080);
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
