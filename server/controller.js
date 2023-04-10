const fetch = require ('node-fetch');
const { Mongoose, model } = require('mongoose');
const models = require('./model');
const ObjectId = require('mongodb').ObjectId;
const { Buffer } = require ('buffer');

const controller = {};

// GOOGLE BOOKS API
controller.getTitle = async (req,res,next) => {
  //console.log(req.body);
  const { title } = req.body

  await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}&key=AIzaSyCXUjqCkxkBUW53n9BRZdQpzmtEb6BwYIk`)
    .then(response => response.json())
    .then(result => {
      //console.log('bookinfo', result.items[0].volumeInfo.categories);
        res.locals.bookInfo = result.items[0].volumeInfo.categories[0]
        // res.locals.books = result.items[0].volumeInfo.description.split(' ').filter(word => word.length > 4);
        return next()
      }
    )}

//SPOTIFY API GET TOKEN
controller.getToken = async (req, res, next) => {
  // get-token creating an access token
  const client_id = '919322e8de7f4fb299a489a332012dc6'; // Your client id
  const client_secret = '93cf2067ac524ef38dde1cb09d21394a'; // Your secret
  //console.log('hello?')
  await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret),
    },
    body: `grant_type=client_credentials`
  })
    .then(data => data.json())
    .then(data => {
      res.locals.token = data.access_token;
      //console.log('token from getToken controller', res.locals.token)
      return next()
    })
}

//SEARCH PLAYLIST ACCORDING TO BOOK DESCRIPTION
controller.search = async ( req, res, next) => {
  const { bookInfo } = res.locals
  //console.log('bookinfo??',res.locals.bookInfo)
  let token = res.locals.token
  //console.log("title", req.body.title)
  //console.log('token from getGenre controller',token)
  //console.log(req.body.title, bookInfo)

  // await fetch(`https://api.spotify.com/v1/search?q=${req.body.title} ${bookInfo} &type=playlist`, {
  await fetch(`https://api.spotify.com/v1/search?q=${req.body.title} &type=playlist`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token,
    },
    // params: {
    //   q: bookInfo,
    //   type: "playlist"
    // }
  })
    .then(data => data.json())
    .then(data => {
      // console.log('inside the search', data)
      //console.log('inside the search data item', data.playlists.items)
      let playlistIDArr = data.playlists.items.map(each=>each.id)
      console.log('inside the search, playlist ids', playlistIDArr)
      res.locals.playlist = playlistIDArr
      // console.log('token from controller', res.locals.token)
      return next()
    })
}

//CREATE PLAYLIST

//  controller.songByPlaylist = async (req,res,next) => {
//   await fetch(`https://api.spotify.com/v1/users/${'dingleboss'}/playlists`, {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${res.locals.token}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       'name' : 'Test Playlist',
//       'description': '',
//       'public' : false,
//     })
//   })
//     .then(response => response.json())
//     .then(result => {
//         console.log('playlist', result);
//         return next()
//       }
//     )}

//  controller.createPlaylist = async (req,res,next) => {
//   console.log(res.locals.token);
//   await fetch(`https://api.spotify.com/v1/users/${'dingleboss'}/playlists`, {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${res.locals.token}`,
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       'name' : 'Test Playlist',
//       'description': '',
//       'public' : false,
//     })
//   })
//     .then(response => response.json())
//     .then(result => {
//         console.log('playlist', result);
//         return next()
//       }
//     )}

//Authent

//GET RECOMMENDATION
//  controller.getRecommendation = async (req,res,next) => {

 // await fetch(`https://api.spotify.com/v1/recommendations`)


//ADD SONGS
//  controller.addSongs = async (req,res,next) => {



module.exports = controller; 