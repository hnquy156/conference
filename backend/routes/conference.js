const router = require('express').Router();
const ConferenceController = require('../controller/conference');

router.get('/', ConferenceController.getConferences);

module.exports = router;
