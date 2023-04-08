const express = require('express');
const router = express.Router();
//const controller = require('./controller');

// TEST SAMPLE ONLY ONE ADDRESS FOR EACH REQUEST
//serve index html
router.get('/', (req, res) => {
    return res
      .status(200)
      .send('sendingggg') //working
  });

module.exports = router;