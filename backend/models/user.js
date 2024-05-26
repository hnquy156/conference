const mongoose = require('mongoose');
const { hashPassword } = require('../utils/crypto');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.pre('save', (next) => {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    this.password = hashPassword(this.password);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('user', userSchema);
