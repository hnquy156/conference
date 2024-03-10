require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initMongoConnection } = require('./configs/mongodb');
const { initCronJob } = require('./configs/cron');
const app = express();

initMongoConnection();

initCronJob();

app.use(cors());
app.use(express.json());

app.use('/api/', require('./routes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('App is listening on port', PORT);
});
