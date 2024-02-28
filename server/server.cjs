const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const uri = 'mongodb+srv://askobliakov:e4357ce4357ce4357c@cluster0.y8rroql.mongodb.net/banking?retryWrites=true&w=majority';

mongoose.connect(uri)
  .then(() => {
    console.log('MongoDB Connected… ok')
  })
  .catch(err => console.log(err))

const UserSchema = new mongoose.Schema({
  username: String,
  lastName: String,
  phone: String,
  email: String,
  password: String,
});

const UserModel = mongoose.model('User', UserSchema);

app.get('/', async (req, res) => {
  const data = await UserModel.find({}, 'username'); // получить только поля username и phone
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
