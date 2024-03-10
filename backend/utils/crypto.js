const bcrypt = require('bcrypt');
const crypto = require('crypto');

const hashPassword = (password) => {
  return bcrypt.hashSync(password, process.env.SECRET_KEY);
};

const comparePassword = (plainPassword, hashPassword) => {
  return bcrypt.compareSync(plainPassword, hashPassword);
};

const createHash = (data) => {
  return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex');
};

const createConferenceHash = ({ name, location, date }) => {
  return createHash({
    name,
    location,
    date,
  });
};

module.exports = {
  hashPassword,
  comparePassword,
  createHash,
  createConferenceHash,
};
