const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
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
  const data = await UserModel.find({});
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

// Регистрация пользователя
app.post('/register', async (req, res) => {
  const { username, phone, email, password } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ username, lastName, phone, email, password: hashedPassword });

    await user.save();

    const token = jwt.sign({ id: user._id }, 'ukraine2024zp@', { expiresIn: '1h' });

    res.status(201).json({ token, message: 'Пользователь успешно зарегистрирован' });
  } catch (error) {
    res.status(500).json({ message: 'Произошла ошибка при регистрации', error });
  }
});

// Авторизация пользователя
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Пользователь с таким именем пользователя не найден' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' });
    }

    const token = jwt.sign({ id: user._id }, 'ukraine2024zp@', { expiresIn: '1h' });

    res.json({ token, userId: user.id });
  } catch (error) {
    res.status(500).json({ message: 'Произошла ошибка при входе в систему', error });
  }
});

