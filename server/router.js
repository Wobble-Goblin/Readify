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

// TEST SAMPLE ONLY ONE ADDRESS FOR EACH REQUEST
//serve index html
router.get('/', (req, res) => {
    return res
      .status(200)
      .send('sendingggg') //working
  });

module.exports = router;