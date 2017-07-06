const express = require('express');
const path    = require('path');
const request = require('request');

const app = express();

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/../views/index.html'));
});

// app.use(express.static(__dirname + '/../views/index.html'));

var client_id = '1781c6c33491424f802591ae3b3f1559'; // Your client id
var client_secret = '7ff5306f33f4435d80c461b80db3ad6f'; // Your secret

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

app.get('/cors', function (req, res) {
  const url = req.query.url;

  request.post(authOptions, (postErr, postResponse, tokenBody) => {

      // use the access token to access the Spotify Web API
      var token = tokenBody.access_token;
      var options = {
        url: url,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };

      request.get(options, (getErr, getRes, getBody) => {
        res.send(getBody);
      });
  });
  //
  //
  // request(url, function (error, response, body) {
  //   if (error) {
  //     res.status(422).send(`Failed to connect to ${url}`);
  //   } else {
  //     res.send(body);
  //   }
  // });
});

// Start up the server
const port = (process.env.PORT || 8080);
app.listen(port, function () {
  console.log(`CORS demo listening on port ${port}`);
});
