// user: readify pass: 123
// mongodb+srv://readify:123@cluster0.9zelvyu.mongodb.net/?retryWrites=true&w=majority

// mongoose.connect('mongodb+srv://readify:123@cluster0.9zelvyu.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connection.once('open', () => {
//   console.log('Connected to Database');
// });


const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  clientID: { type: String, required: true },
  secretID: { type: String, required: true },
  token: {type: String},
});

const user = mongoose.model('user', userSchema);
// You must export your model through module.exports
// The collection name should be 'student'
module.exports = {
  user
};