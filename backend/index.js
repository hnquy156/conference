require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initMongoConnection } = require('./configs/mongodb');
const app = express();

initMongoConnection();

app.use(cors());
app.use(express.json());

app.use('/api/', require('./routes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('app is listening on port', PORT);
});
