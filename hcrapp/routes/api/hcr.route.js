var express = require('express');
var router = express.Router();
// Getting the Todo Controller that we just created
var HCRController = require('../../controllers/hcr.controller');
// Map each API to the Controller FUnctions
router.post('/', HCRController.generateOutput);
// Export the Router
module.exports = router;