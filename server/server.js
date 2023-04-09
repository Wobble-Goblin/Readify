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

app.get('/login', function(req, res) {

  var scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
  const params = new URLSearchParams();
  params.append('response_type', 'code');
  params.append('client_id', '919322e8de7f4fb299a489a332012dc6');
  params.append('redirect_uri', 'http://localhost:3000/callback');
  params.append('scope', scope);

  //var state = generateRandomString(16);
  res.status(301).redirect('https://accounts.spotify.com/authorize?' + params.toString())
});

app.use('/callback', (req, res) => {
  const code = req.query.code;
  console.log(code);
  const authid = '919322e8de7f4fb299a489a332012dc6'; 
  const authsec = '93cf2067ac524ef38dde1cb09d21394a';
  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + 'OTE5MzIyZThkZTdmNGZiMjk5YTQ4OWEzMzIwMTJkYzY6OTNjZjIwNjdhYzUyNGVmMzhkZGUxY2IwOWQyMTM5NGE=',
    },
    body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent("http://localhost:3000/callback")}`,
  })
  .then((data) => data.json())
  .then(data => console.log(data))
})

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