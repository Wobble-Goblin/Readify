const express = require('express');
const router = express.Router();
const controller = require('./controller');

// GETS SPOTIFY TOKEN
// get-token creating an access token


  // router.post('/get-token',
  // controller.getToken, (err, res, body) => {
  //   if (!err && res.statusCode === 200) {
  //     const token = body.access_token;
  //   }
  // });

// GET BOOK
router.post('/get-title',
//controller.getTitle,
controller.getToken,
controller.createPlaylist,
//get recommendations,
//add songs,
(req,res) => res.status(200).json(res.locals.musicForBooks))

// router.get('/login', function(req, res) {
//   // scope is what spotify set and describes what you're allowed to do with the token 
//   var scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
//   const params = new URLSearchParams();
//   params.append('response_type', 'code');
//   params.append('client_id', '919322e8de7f4fb299a489a332012dc6'); 
//   params.append('redirect_uri', 'http://localhost:3000/api/callback')
//   params.append('scope', scope); // spotify requires URL encoded, not json 

//   //var state = generateRandomString(16);
//   res.status(301).redirect('https://accounts.spotify.com/authorize?' + params.toString()) // 301 is HTTP code for redirect, the params get put into the string
// });
// we get redirect from spotify to go redirect URL

router.use('/callback', (req, res, next) => {
  const code = req.query.code; // code we receive from spotify
  console.log(code);
  const authid = '919322e8de7f4fb299a489a332012dc6'; // these two are from app that we made with spotify
  const authsec = '93cf2067ac524ef38dde1cb09d21394a';
  fetch('https://accounts.spotify.com/api/token', { // fetch request tells spotify you have the code now and you send this info
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + 'OTE5MzIyZThkZTdmNGZiMjk5YTQ4OWEzMzIwMTJkYzY6OTNjZjIwNjdhYzUyNGVmMzhkZGUxY2IwOWQyMTM5NGE=', // this is the base 64 of the authid and authsec with colon in middle
      // 'Authorization': 'Basic ' + btoa(authid + ':' + authsec),
    },
    body: `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent("http://localhost:3000/api/callback")}`, // this is basically the request being sent out
  })
  .then((data) => data.json())
  .then(data => {
    console.log(data.access_token);
    res.locals.token = data.access_token;
    next();
  }) // data will include access token which you can use in subsequent fetch requests to the spotify API
})

// TEST SAMPLE ONLY ONE ADDRESS FOR EACH REQUEST
//serve index html
router.get('/', (req, res) => {
  return res
    .status(200)
    .send('sendingggg') //working
});

module.exports = router;