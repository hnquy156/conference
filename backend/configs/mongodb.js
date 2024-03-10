const mongoose = require('mongoose');

const initMongoConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Mongodb connection established');
  } catch (error) {
    console.error('initMongoConnection', error);
  }
};

module.exports = { initMongoConnection };
