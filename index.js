const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();

const app = express();

// Add this line to parse JSON data in the request body
app.use(express.json());
const passw = process.env.PASS;
// MongoDB connection
mongoose.connect('mongodb+srv://singh1203:'+passw+'@cluster0.qxhqqrq.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  mongoose.set("strictQuery", false);


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Middleware for handling errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Server error' });
});

// Routes

// GET /users - Retrieve a list of all users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// GET /users/:id - Retrieve a user by ID
app.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
});

// POST /users - Create a new user
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({
    name,
    email,
    password,
  });
  const savedUser = await newUser.save();
  res.status(201).json(savedUser);
});

// PUT /users/:id - Update a user by ID
app.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;
  let user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  user.name = name || user.name;
  user.email = email || user.email;
  user.password = password || user.password;
  user = await user.save();
  res.json(user);
});

// DELETE /users/:id - Delete a user by ID
app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  await User.findByIdAndRemove(userId);
  res.json({ message: 'User deleted successfully' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
