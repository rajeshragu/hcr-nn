var express = require('express');
var router = express.Router();
// Getting the Todo Controller that we just created
var FEController = require('../../controllers/fe.controller');

// Map each API to the Controller FUnctions
router.get('/sendElements', FEController.sendElements);

// Export the Router
module.exports = router;