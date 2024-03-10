const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({
    status: true,
    data: 'Hello, world!',
  });
});

module.exports = router;
