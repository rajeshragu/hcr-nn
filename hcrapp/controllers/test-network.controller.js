// Accessing the Service that we just created
var TestNetworkService = require('../services/test-network.service');
// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.testNetwork = async function(req, res, next){
    // Req.Body contains the form submit values.
    var testData = { DataSet: req.body.DataSet};
    try{        
        // Calling the Service function with the new object from the Request Body    
        var outputStatus = await TestNetworkService.testNetwork(testData);
        //var outputStatus = 'A';
        return res.status(201).json(
            {
                status: 201,
                status: outputStatus,
                message: "Successfully tested network."
            }
        )
    }catch(e){        
        //Return an Error Response Message with Code and the Error Message.        
        return res.status(400).json(
            {
                status: 400,                
                status: outputStatus,
                message: "Error while testing the network in controller."
            }
        )
    }
}