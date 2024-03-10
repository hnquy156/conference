const { CronJob } = require('cron');
const Scraper = require('../utils/scraper');
const { updateChangedConference } = require('../services/conference');

const initCronJob = () => {
  try {
    const CRON_PATTERN = '* * * * *'; // every minute
    const job = new CronJob(CRON_PATTERN, async () => {
      const conferences = await Scraper.getConferences();
      conferences.forEach((conf) => {
        updateChangedConference(conf).catch((error) => {
          console.error('updateChangedConference', error.message);
        });
      });
    });

    job.start();

    console.log('Init Scraper Cronjob');
  } catch (err) {
    console.error('initCronJob', err);
  }
};

module.exports = { initCronJob };
