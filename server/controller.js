const fetch = require ('node-fetch');
const { Mongoose, model } = require('mongoose');
const { History } = require('./model');
const ObjectId = require('mongodb').ObjectId;
const { Buffer } = require ('buffer');

const controller = {};

// GOOGLE BOOKS API
controller.getTitle = async (req,res,next) => {
  //console.log(req.body);
  const { title } = req.body;
  res.locals.title = title;

  await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&key=AIzaSyCXUjqCkxkBUW53n9BRZdQpzmtEb6BwYIk`)
    .then(response => response.json())
    .then(result => {
      //console.log('bookinfo', result.items[0].volumeInfo.categories);
        //res.locals.bookInfo = result.items[0].volumeInfo.categories[0]
        res.locals.books = result.items[0].volumeInfo.description.split(' ').filter(word => word.length > 3);
        return next()
      }
    )}

  controller.createPlaylist = async (req, res, next) => {
    const token = 'BQBGQEQOMmEoWV8gt6pa7tyTSwwUzAshZaRTL4MXyB9hX6guNjI7M1WGiT38b8hE1DZWxd7ENzPKmxFOyev9tac34abRGc6lIPRP6UpZtEIcS5QqljrIcdEdLcwpF0Y1ZzNhXFH0EIWGgIc11ByICJ93uJplK6BvxNbQyQ1coLSn5SxVLP9vO0sHjdMn4hos3Vyz71qr3WE5y9vEr00EmpV0lLws4EdbOJ0CdW4hDHiwQlP7h_pht0HnnUbQvg';
    res.locals.token = token;
    await fetch(`https://api.spotify.com/v1/users/${'dingleboss'}/playlists`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: res.locals.title,
        description: '',
        public: false,
      })
    })
      .then(response => response.json())
      .then(result => {
        console.log('playlist', result.id);

        res.locals.playlistId = result.id;
        return next()
      }
      )
  }


  controller.getRecommendations = async (req, res, next) => {
    const artistSeed = '4NHQUGzhtTLFvgF5SZesLK';
    const trackSeed = '0c6xIDDpzE81m2q797ordA';
    const genreSeed = res.locals.books;
    //const genreSeed = 'classical, country';

    //curl -X "GET" "https://api.spotify.com/v1/recommendations?market=US&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_tracks=0c6xIDDpzE81m2q797ordA&min_energy=0.4&min_popularity=50" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer "
    await fetch(`https://api.spotify.com/v1/recommendations?seed_artists=${artistSeed}&seed_tracks=${trackSeed}&seed_genre${genreSeed.join(',')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${res.locals.token}`
      }
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data.tracks.map(track => track.uri));
        res.locals.tracks = data.tracks.map(track => track.uri);
        return next();
      })
  }

  controller.addTracks = async (req, res, next) => {
    await fetch(`https://api.spotify.com/v1/playlists/${res.locals.playlistId}/tracks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${res.locals.token}`,
      },
      body: JSON.stringify({
        uris: res.locals.tracks
      })
    })
      .then(data => next());
  }


//SAVE title and playlist for tracks into DB
controller.saveToDB = (req, res, next) => {
  History.create({ title: res.locals.title, playlistId: res.locals.playlistId })
    .then(data => {
      console.log(data);
      return next();
    })
    .catch(err => {
      return next({
      log: `controller.saveToDB: ERROR: ${err}`,
      message: { err: 'Error occurred in controller.saveToDB. Check server logs for more details.' }
      })  
     })
}
 
controller.sendDataBackToFront = (req, res, next) => {
  History.find()
    .then(data => {
      console.log(data)
      res.locals.fromDB = data
      return next()
     })
    .catch(err => {
      return next({
      log: `controller.sendDataBackToFront: ERROR: ${err}`,
      message: { err: 'Error occurred in controller.sendDataBackToFront. Check server logs for more details.' }
      })  
     })
 }


module.exports = controller; 