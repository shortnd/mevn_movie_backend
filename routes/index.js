var router = require('express').Router();

router.get('/', function(req, res) {
  res.json({ message: 'API Initialized'});
});

module.exports = router;
