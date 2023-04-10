const express = require('express');
const router2 = express.Router();
const controller = require('./controller');

// GETS SPOTIFY TOKEN
// get-token creating an access token


router2.post('/get-playlist',
  controller.getTitle, controller.getToken, controller.search, (err, res) => {
  return res.status(200).json(res.locals.playlist)
});

// GET BOOK
// router2.post('/get-title',
// controller.getTitle,
// // controller.getToken,
// // controller.createPlaylist,
// //get recommendations,
// //add songs,
// (req,res) => res.status(200).json(res.locals.musicForBooks))


// TEST SAMPLE ONLY ONE ADDRESS FOR EACH REQUEST
//serve index html
router2.get('/', (req, res) => {
  return res
    .status(200)
    .send('sendingggg') //working
});

module.exports = router2;