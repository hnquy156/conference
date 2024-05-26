const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({
    status: true,
    data: 'Hello, world!',
  });
});
router.use('/conferences', require('./conference'));
router.use('/users', require('./user'))

module.exports = router;
