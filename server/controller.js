const fetch = require ('node-fetch');
const { Mongoose, model } = require('mongoose');
const models = require('./model');
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
        console.log('bookinfo', result.items[0].volumeInfo.title, result.items[0].volumeInfo.description.split(' ').filter(word => word.length > 3));
        res.locals.books = result.items[0].volumeInfo.description.split(' ').filter(word => word.length > 3);
        return next()
      }
    )}

//SPOTIFY API GET TOKEN
// controller.getToken = async (req,res,next) => {
//   // get-token creating an access token
//   const client_id = '919322e8de7f4fb299a489a332012dc6'; // Your client id
//   const client_secret = '93cf2067ac524ef38dde1cb09d21394a'; // Your secret

//   try { 
//     const result = await fetch('https://accounts.spotify.com/api/token', { 
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
//   })
//   const data = await result.json();
//     res.locals.token = data.access_token;
//     console.log('token', res.locals.token)
//   return next()
//   } catch (err) {
//     console.log("Error in creating location:", JSON.stringify(err));
//     return next("Error:" + JSON.stringify(err));
//   }
//  }

// controller.getToken = async(req, res, next) => {
//   var scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';
//   const params = new URLSearchParams();
//   params.append('response_type', 'code');
//   params.append('client_id', '919322e8de7f4fb299a489a332012dc6'); 
//   params.append('redirect_uri', 'http://localhost:3000/callback') 
//   params.append('scope', scope); // spotify requires URL encoded, not json 

//   //var state = generateRandomString(16);
//   res.status(301).header({'Access-Control-Allow-Origin': 'http://localhost:3000', 'mode': 'no-cors'}).redirect('https://accounts.spotify.com/authorize?' + params.toString()) // 301 is HTTP code for redirect, the params get put into the string
//   }



//CREATE PLAYLIST

 controller.createPlaylist = async (req,res,next) => {
  const token = 'BQAHZElU55WscpuU59m8O9NBU5WTtPrVlk3QYJ481yIOkvDw5feVqTMdm-sZpH42xefdGUqpZBGwSqPPaUQjeBuLp9sAaMUmCIlzSRd66wF_uDbx562bg2_LkZZsmqfs-_Ez8ERK_hj_uO1j4eKqBJ5c26iU32IGTgq6MzLDH3HkVvGDy4JfK2xao5VxPexOzRcPiZhaDxdp9P2fwSoqZHwiXrYmaoJdOpvRPT5qzRlOcSCxT2sd2m6Lhu6c_Q';
  await fetch(`https://api.spotify.com/v1/users/${'dingleboss'}/playlists`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name : res.locals.title,
      description : '',
      public : false,
    })
  })
    .then(response => response.json())
    .then(result => {
        console.log('playlist', result.id);

        res.locals.playlistId = result.id;
        return next()
      }
    )}

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
      'Authorization': 'Bearer BQAHZElU55WscpuU59m8O9NBU5WTtPrVlk3QYJ481yIOkvDw5feVqTMdm-sZpH42xefdGUqpZBGwSqPPaUQjeBuLp9sAaMUmCIlzSRd66wF_uDbx562bg2_LkZZsmqfs-_Ez8ERK_hj_uO1j4eKqBJ5c26iU32IGTgq6MzLDH3HkVvGDy4JfK2xao5VxPexOzRcPiZhaDxdp9P2fwSoqZHwiXrYmaoJdOpvRPT5qzRlOcSCxT2sd2m6Lhu6c_Q'
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
const token = 'BQAHZElU55WscpuU59m8O9NBU5WTtPrVlk3QYJ481yIOkvDw5feVqTMdm-sZpH42xefdGUqpZBGwSqPPaUQjeBuLp9sAaMUmCIlzSRd66wF_uDbx562bg2_LkZZsmqfs-_Ez8ERK_hj_uO1j4eKqBJ5c26iU32IGTgq6MzLDH3HkVvGDy4JfK2xao5VxPexOzRcPiZhaDxdp9P2fwSoqZHwiXrYmaoJdOpvRPT5qzRlOcSCxT2sd2m6Lhu6c_Q';
  await fetch(`https://api.spotify.com/v1/playlists/${res.locals.playlistId}/tracks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      uris: res.locals.tracks
    })
  })
  .then(data => next());
 }


//ADD SONGS
//  controller.addSongs = async (req,res,next) => {




module.exports = controller; 