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

const TransactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cardNumber: Number,
  cardName: String,
  cardType: String,
  type: String, 
  amount: Number,
  balance: Number,
  currency: String,
  date: { type: Date, default: Date.now },
  time: { type: Date, default: Date.now }
});

const UserModel = mongoose.model('User', UserSchema);
const CardModel = mongoose.model('Card', CardSchema);
const TransactionModel = mongoose.model('Transaction', TransactionSchema);

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

// Пополнение мобильного счета
app.post('/topUp', async (req, res) => {
  const { userId, cardNumber, amount } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' });
    }

    const card = await CardModel.findOne({ userId, number: cardNumber });
    if (!card) {
      return res.status(400).json({ message: 'Карта не найдена' });
    }

    if (card.balance < amount) {
      return res.status(400).json({ message: 'Недостаточно средств на карте' });
    }

    card.balance -= amount;
    await card.save();

    const transaction = new TransactionModel({ 
      userId, 
      cardNumber, 
      cardName: card.name, 
      cardType: card.type, 
      type: 'Поповнення мобільного', 
      amount: -amount,
      currency: card.currency,
    });
    await transaction.save();

    res.status(200).json({ message: 'Мобильный счет успешно пополнен' });
  } catch (error) {
    res.status(500).json({ message: 'Произошла ошибка при пополнении мобильного счета', error });
  }
});

// Перевод средств между картами пользователя
app.post('/transfer', async (req, res) => {
  const { userId, fromCardNumber, toCardNumber, amount } = req.body;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' });
    }

    const fromCard = await CardModel.findOne({ userId, number: fromCardNumber });
    if (!fromCard) {
      return res.status(400).json({ message: 'Карта-источник не найдена' });
    }

    const toCard = await CardModel.findOne({ userId, number: toCardNumber });
    if (!toCard) {
      return res.status(400).json({ message: 'Карта-получатель не найдена' });
    }

    if (fromCard.balance < amount) {
      return res.status(400).json({ message: 'Недостаточно средств на карте-источнике' });
    }

    fromCard.balance -= amount;
    await fromCard.save();

    toCard.balance += amount;
    await toCard.save();

    const transactionFrom = new TransactionModel({ 
      userId, 
      cardNumber: fromCardNumber, 
      cardName: fromCard.name, 
      cardType: fromCard.type, 
      type: 'Переказ з', 
      amount: -amount, 
      currency: fromCard.currency 
    });
    await transactionFrom.save();

    const transactionTo = new TransactionModel({ 
      userId, 
      cardNumber: toCardNumber, 
      cardName: toCard.name, 
      cardType: toCard.type, 
      type: 'Переказ на ', 
      amount: amount, 
      currency: toCard.currency 
    });
    await transactionTo.save();

    res.status(200).json({ message: 'Перевод успешно выполнен' });
  } catch (error) {
    res.status(500).json({ message: 'Произошла ошибка при переводе средств', error });
  }
});

app.get('/getTransactions', async (req, res) => {
  const { userId } = req.query;

  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(400).json({ message: 'Пользователь не найден' });
    }

    const transactions = await TransactionModel.find({ userId })
      .sort({ date: -1 })
    if (!transactions.length) {
      return res.status(400).json({ message: 'Транзакции не найдены' });
    }

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Произошла ошибка при получении информации о транзакциях', error });
  }
});


















