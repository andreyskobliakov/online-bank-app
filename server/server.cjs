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
  phone: String,
  email: String,
  password: String,
});

const CardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  type: String,
  currency: String,
  paymentSystem: String,
  creditLimit: Number,
  number: Number,
  expiryDate: String,
  cvv: Number,
  balance: Number,
});


const UserModel = mongoose.model('User', UserSchema);
const CardModel = mongoose.model('Card', CardSchema);


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
    const user = new UserModel({ username, phone, email, password: hashedPassword });

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


// Открытие банковской карты
app.post('/openCard', async (req, res) => {
  const { userId, name, type, currency, paymentSystem, creditLimit } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' });
    }

    const number = Math.floor(Math.random() * 10000000000000000);
    const expiryDate = ('0' + (new Date().getUTCMonth() + 1)).slice(-2) + '/' + (new Date().getUTCFullYear() + 3).toString().slice(-2);
    const cvv = Math.floor(Math.random() * 1000);
    const balance = 0.00;

    const card = new CardModel({ userId, name, type, currency, paymentSystem, creditLimit, number, expiryDate, cvv, balance });

    await card.save();

    res.status(201).json({ message: 'Карта успешно открыта' });
  } catch (error) {
    res.status(500).json({ message: 'Произошла ошибка при открытии карты', error });
  }
});


// Получение информации о всех картах пользователя
app.get('/getCards', async (req, res) => {
  const { userId } = req.query;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' });
    }

    const cards = await CardModel.find({ userId });
    if (!cards.length) {
      return res.status(400).json({ message: 'Карты не найдены' });
    }

    res.status(200).json(cards);
  } catch (error) {
    res.status(500).json({ message: 'Произошла ошибка при получении информации о картах', error });
  }
});

// Получение полной информации о карте по номеру
app.get('/getCardDetails', async (req, res) => {
  const { cardNumber } = req.query;

  try {
    const card = await CardModel.findOne({ number: cardNumber });
    if (!card) {
      return res.status(404).json({ message: 'Карта не найдена' });
    }

    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: 'Произошла ошибка при получении информации о карте', error });
  }
});






