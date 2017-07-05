// // $.ajax({
// //   url: 'https://api.spotify.com/v1/search',
// //   data: {
// //       q: "Elvis Presley",
// //       type: 'artist'
// //   },
// // }).then((arg) => console.log(arg));
// //
// // $.ajax({
// //   method: 'POST',
// //   url: 'https://accounts.spotify.com/api/token',
// //   header: {
// //     Authorization: Basic
// //   }
// // }).then((arg) => console.log(arg));
// //
// //
// // $.ajax(
// //   {
// //     method: "POST",
// //     url: "https://accounts.spotify.com/api/token",
// //     data: {
// //       "grant_type":    "authorization_code",
// //       "client_secret": '7ff5306f33f4435d80c461b80db3ad6f',
// //       "client_id":     '1781c6c33491424f802591ae3b3f1559',
// //     },
// //   }
// // ).then((arg) => console.log(arg));
//
// /**
//  * This is an example of a basic node.js script that performs
//  * the Client Credentials oAuth2 flow to authenticate against
//  * the Spotify Accounts.
//  *
//  * For more information, read
//  * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
//  */
//
// var request = require('request'); // "Request" library
//
// var client_id = '1781c6c33491424f802591ae3b3f1559'; // Your client id
// var client_secret = '7ff5306f33f4435d80c461b80db3ad6f'; // Your secret
//
// // your application requests authorization
// var authOptions = {
//   url: 'https://accounts.spotify.com/api/token',
//   headers: {
//     'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//   },
//   form: {
//     grant_type: 'client_credentials'
//   },
//   json: true
// };
//
// $.ajax({
//   url: 'https://accounts.spotify.com/api/token',
//   headers: {
//     'Authorization': 'Basic ' + (window.btoa(client_id + ':' + client_secret))
//   },
//   dataType: 'jsonp',
//   form: {
//     grant_type: 'client_credentials'
//   },
//   json: true
// }).then(arg => console.log(arg));
//
// $.ajax({
//   url: 'https://accounts.spotify.com/api/token',
//   headers: {
//     'Authorization': 'Basic ' + (window.btoa('1781c6c33491424f802591ae3b3f1559' + ':' + '7ff5306f33f4435d80c461b80db3ad6f')),
//     'Access-Control-Allow-Origin': '*'
//   },
//   form: {
//     grant_type: 'client_credentials'
//   },
//   json: true
// }).then(arg => console.log(arg));
//
// // request.post(authOptions, function(error, response, body) {
// //   if (!error && response.statusCode === 200) {
// //
// //     // use the access token to access the Spotify Web API
// //     var token = body.access_token;
// //     var options = {
// //       url: 'https://api.spotify.com/v1/users/jmperezperez',
// //       headers: {
// //         'Authorization': 'Bearer ' + token
// //       },
// //       json: true
// //     };
// //     request.get(options, function(error, response, body) {
// //       console.log(body);
// //     });
// //   }
// // });
