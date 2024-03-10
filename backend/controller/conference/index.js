const ConferenceService = require('../../services/conference');

const getConferences = async (req, res) => {
  try {
    const conferences = await ConferenceService.getConferences();
    res.json({
      status: true,
      data: conferences,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getConferences,
};
