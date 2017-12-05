var express = require('express');
var router = express.Router();
var hcr = require('./api/hcr.route');
router.use('/hcr', hcr);
module.exports = router;