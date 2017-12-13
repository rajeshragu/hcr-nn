// Accessing the Service that we just created
var TrainNetworkService = require('../services/train-network.service');
// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.trainNetwork = async function(req, res, next){
    // Req.Body contains the form submit values.
    var trainingData = { DataSet: req.body.DataSet, TargetCharacter: req.body.TargetCharacter};
    try{        
        // Calling the Service function with the new object from the Request Body    
        var outputStatus = await TrainNetworkService.trainNetwork(trainingData);
        //var outputStatus = 'A';
        return res.status(201).json(
            {
                status: 201,
                status: outputStatus,
                message: "Successfully trained network."
            }
        )
    }catch(e){        
        //Return an Error Response Message with Code and the Error Message.        
        return res.status(400).json(
            {
                status: 400,                
                status: outputStatus,
                message: "Error while training the network in controller."
            }
        )
    }
}