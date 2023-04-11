// user: readify pass: 123
// mongodb+srv://readify:123@cluster0.9zelvyu.mongodb.net/?retryWrites=true&w=majority

// mongoose.connect('mongodb+srv://readify:123@cluster0.9zelvyu.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connection.once('open', () => {
//   console.log('Connected to Database');
// });


const mongoose = require('mongoose');
//const ObjectId = require('mongodb').ObjectId;

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true },
  token: { type: String },
  //title
  //playlist id : []
});

const User = mongoose.model('User', userSchema);

// SCHEMA FOR HISTORY
const historySchema = new Schema({
  title: {type:String, required:true},
  playlistId : String
})

const History = mongoose.model('History',historySchema)

// You must export your model through module.exports
// The collection name should be 'student'
module.exports = {
  User,
  History
};

// const locationsSchema = new Schema({
//   name: String,
//   reviews: [
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'reviews'
//     }
//   ] 
// });