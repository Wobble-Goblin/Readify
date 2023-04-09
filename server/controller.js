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
        console.log('bookinfo', result.items[0].volumeInfo.title, result.items[0].volumeInfo.description.split(' ').filter(word => word.length > 3));
        res.locals.books = result.items[0].volumeInfo.description.split(' ').filter(word => word.length > 3);
        return next()
      }
    )}

//SPOTIFY API GET TOKEN
controller.getToken = async (req,res,next) => {
  // get-token creating an access token
  const client_id = '919322e8de7f4fb299a489a332012dc6'; // Your client id
  const client_secret = '93cf2067ac524ef38dde1cb09d21394a'; // Your secret

  try { 
    const result = await fetch('https://accounts.spotify.com/api/token', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
  })
  const data = await result.json();
    res.locals.token = data.access_token;
    console.log('token', res.locals.token)
  return next()
  } catch (err) {
    console.log("Error in creating location:", JSON.stringify(err));
    return next("Error:" + JSON.stringify(err));
  }
 }

//CREATE PLAYLIST

 controller.createPlaylist = async (req,res,next) => {
  console.log(res.locals.token);
  await fetch(`https://api.spotify.com/v1/users/${'dingleboss'}/playlists`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${res.locals.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'name' : 'Test Playlist',
      'description': '',
      'public' : false,
    })
  })
    .then(response => response.json())
    .then(result => {
        console.log('playlist', result);
        return next()
      }
    )}

//Authent

//GET RECOMMENDATION
//  controller.getRecommendation = async (req,res,next) => {

 // await fetch(`https://api.spotify.com/v1/recommendations`)


//ADD SONGS
//  controller.addSongs = async (req,res,next) => {



module.exports = controller; 