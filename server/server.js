const path = require('path');
const express = require('express');
const cors = require('cors');
const querystring = require('querystring')

const app = express();

const router = require('./router.js');

const PORT = 3000;

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, '/dist')));

// login and callback are used for autentification (OAuth)
// app.get('/login', function(req, res) {
//   // scope is what spotify set and describes what you're allowed to do with the token 
//   var scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
//   const params = new URLSearchParams();
//   params.append('response_type', 'code');
//   params.append('client_id', '919322e8de7f4fb299a489a332012dc6'); 
//   params.append('redirect_uri', 'http://localhost:3000/callback') 
//   params.append('scope', scope); // spotify requires URL encoded, not json 

//   //var state = generateRandomString(16);
//   res.status(301).redirect('https://accounts.spotify.com/authorize?' + params.toString()) // 301 is HTTP code for redirect, the params get put into the string
// });
// // we get redirect from spotify to go redirect URL

// app.use('/callback', (req, res) => {
//   const code = req.query.code; // code we receive from spotify
//   console.log(code);
//   const authid = '919322e8de7f4fb299a489a332012dc6'; // these two are from app that we made with spotify
//   const authsec = '93cf2067ac524ef38dde1cb09d21394a';
//   fetch('https://accounts.spotify.com/api/token', { // fetch request tells spotify you have the code now and you send this info
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Authorization': 'Basic ' + 'OTE5MzIyZThkZTdmNGZiMjk5YTQ4OWEzMzIwMTJkYzY6OTNjZjIwNjdhYzUyNGVmMzhkZGUxY2IwOWQyMTM5NGE=', // this is the base 64 of the authid and authsec with colon in middle
//       // 'Authorization': 'Basic ' + btoa(authid + ':' + authsec),
//     },
//     body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent("http://localhost:3000/callback")}`, // this is basically the request being sent out
//   })
//   .then((data) => data.json())
//   .then(data => console.log(data.access_token)) // data will include access token which you can use in subsequent fetch requests to the spotify API
// })

app.use('/api', router);

//catch all
app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

// default error
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;