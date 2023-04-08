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
  const client_id = '56fce6d540854f16ac1e2fd5661cde9f'; // Your client id
  const client_secret = '53e52133fcb24e2eaf0d20ee213ea9c2'; // Your secret

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
  await fetch(`https://api.spotify.com/v1/users/${'matteodite'}/playlists`, {
    method: 'POST',
    headers: {"Authorization": `Bearer ${res.locals.token}`},
    body: {
      'name' : 'Test Playlist',
      'description': '',
      'public' : false,
    }
  })
    .then(response => response.json())
    .then(result => {
        console.log('playlist', result);
        return next()
      }
    )}



//GET RECOMMENDATION
//  controller.getRecommendation = async (req,res,next) => {

 // await fetch(`https://api.spotify.com/v1/recommendations`)


//ADD SONGS
//  controller.addSongs = async (req,res,next) => {



module.exports = controller; 