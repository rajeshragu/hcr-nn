// Accessing the Service that we just created
var FEService = require('../services/fe.service');
// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List
exports.sendElements = async function(req, res, next){
    // Req.Body contains the form submit values.
    var inputData = req.body.inputData;
    try{        
        // Calling the Service function with the new object from the Request Body    
        var outputData = await FEService.sendElements();
        //var outputData = 'A';
        return res.status(201).json(
            {
                status: 201, 
                data: outputData,
                message: "Successfully generated output."
            }
        )
    }catch(e){        
        //Return an Error Response Message with Code and the Error Message.        
        return res.status(400).json(
            {
                status: 400, 
                message: "Error while generating output in controller."
            }
        )
    }
}