var express = require('express');
var multer = require('multer');
var router = express.Router();
// Getting the Todo Controller that we just created
var HCRController = require('../../controllers/hcr.controller');
var TrainNetworkController = require('../../controllers/train-network.controller');
var TestNetworkController = require('../../controllers/test-network.controller');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
});

var upload = multer({ storage: storage });

// Map each API to the Controller FUnctions
router.post('/', HCRController.generateOutput);
router.post("/upload", upload.array("uploads[]", 12), HCRController.uploadFiles);
router.post("/train-network", TrainNetworkController.trainNetwork);
router.post("/test-network", TestNetworkController.testNetwork);

// Export the Router
module.exports = router;