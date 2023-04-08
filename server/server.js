const path = require('path');
const express = require('express');
const cors = require('cors');
const querystring = require('querystring')

const app = express();

const router = require('./router.js');

const PORT = 3000;

app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, './client')));

app.get('/login', (req, res) => {

  
  res.status(301).redirect('https://accounts.spotify.com/authorize?' + 
    querystring.stringify({
      response_type: 'code',
      client_id: 'dingleboss',
      redirect_uri: 'localhost:3000/worked'
    })
  )
})

app.use('/api',router);

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