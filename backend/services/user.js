const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { comparePassword } = require('../utils/crypto');

const validateSignUp = async (email, password, res) => {
  const existedUser = await User.findOne({ email });
  if (existedUser) {
    return res.status(401).json({ message: 'Email already exists' });
  }
  const user = new User({ email, password });
  await user.save();
  res.status(201).json({ message: 'User created successfully' });
};

const validateLogin = async (email, password, res) => {
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const isPasswordValid = comparePassword(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ email: email }, process.env.SECRET_KEY, {
    expiresIn: '3h',
  });
  res.status(200).json({ token });
};

module.exports = {
  validateSignUp,
  validateLogin,
};
