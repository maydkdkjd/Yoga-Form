const express = require('express');
const User = require('./db');
const app = express();
const completePayment = require('./completePayment');
const cors = require('cors');

app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.error(`Error fetching users: ${error}`);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

app.post('/userData', async (req, res) => {
  const userData = req.body;
  console.log(req.body);
  const { name, email, age, batch } = req.body;
  const newUser = new User({
    name: name,
    email: email,
    age: age,
    batch: batch,
    createdAt: new Date(),
  });

  const paymentResponse = await completePayment(userData);
  if (paymentResponse.success) {
    newUser
      .save()
      .then(() => {
        res.status(200).json({ status: 'success', message: 'You have been registered' });
      })
      .catch((error) => {
        res.status(500).json({ status: 'error', message: 'User already exists' });
      });
  } else {
    res.status(400).json({ status: 'error', message: 'Payment failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
