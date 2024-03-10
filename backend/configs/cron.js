const { CronJob } = require('cron');
const Scraper = require('../utils/scraper');

const initCronJob = () => {
  try {
    const job = new CronJob('* * * * *', async () => {
      const conferences = await Scraper.getConferences();
      console.log('🚀  conferences:', conferences);
    });

    job.start();

    console.log('Init Scraper Cronjob');
  } catch (err) {
    console.error('initCronJob', err);
  }
};

module.exports = { initCronJob };
