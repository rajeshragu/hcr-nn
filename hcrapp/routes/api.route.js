var express = require('express');
var router = express.Router();
var hcr = require('./api/hcr.route');
var formElements = require('./api/formElements.route');

router.use('/hcr', hcr);
router.use('/formElements', formElements);

module.exports = router;