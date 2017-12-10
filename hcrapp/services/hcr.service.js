var synaptic = require('synaptic');
// Saving the context of this module inside the _the variable
_this = this;

exports.generateOutput = async function(inputData){
    try{
        var inputDataFinal = inputData.split(',').map(Number);
        // create the network
        var Layer = synaptic.Layer;
        var Network = synaptic.Network;
        var inputLayer = new Layer(25);
        var hiddenLayer = new Layer(5);
        var outputLayer = new Layer(5);
        inputLayer.project(hiddenLayer);
        hiddenLayer.project(outputLayer);
        var myNetwork = new Network({
            input: inputLayer,
            hidden: [hiddenLayer],
            output: outputLayer
        });
        // train the network
        var learningRate = .3;
        for (var i = 0; i < 20000; i++)
        {
            myNetwork.activate([0,0,1,0,0,0,1,0,1,0,1,0,0,0,1,1,1,1,1,1,1,0,0,0,1]);
            myNetwork.propagate(learningRate, [0,0,0,0,0]);
            
            myNetwork.activate([1,1,1,1,0,1,0,0,0,1,1,1,1,1,0,1,0,0,0,1,1,1,1,1,0]);
            myNetwork.propagate(learningRate, [0,0,0,0,1]);

            myNetwork.activate([0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,1,1,1]);
            myNetwork.propagate(learningRate, [0,0,0,1,0]);
            
            myNetwork.activate([1,1,1,1,0,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,0]);
            myNetwork.propagate(learningRate, [0,0,0,1,1]);
        }
        var exported = myNetwork.toJSON();
        var imported = Network.fromJSON(exported);
        var resultRawArr = [];
        var resultIntArr = [];
        var resultIndexArray = [];
        var outputArr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        var resultArray = [];
        // test the network
        //resultRawArr.push(imported.activate([0,0,1,0,0,0,1,0,1,0,1,0,0,0,1,1,1,1,1,1,1,0,0,0,1]));
        //resultRawArr.push(imported.activate([1,1,1,1,0,1,0,0,0,1,1,1,1,1,0,1,0,0,0,1,1,1,1,1,0]));
        //resultRawArr.push(imported.activate([0,1,1,1,1,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,1,1,1]));
        //resultRawArr.push(imported.activate([1,1,1,1,0,1,0,0,0,1,1,0,0,0,1,1,0,0,0,1,1,1,1,1,0]));
        resultRawArr.push(imported.activate(inputDataFinal));
        console.log('--Raw Output--', resultRawArr);        
        // formatting the output
        for(let result of resultRawArr){
            resultIntArr.push(result.map(function (x) { 
            return Math.round(x); 
            }));
        }
        console.log('--Output in 0,1 Array--', resultIntArr);
        // merging array elements and getting indexes
        for(let result of resultIntArr){
            resultIndexArray.push(parseInt(result.join(''), 2));
        }
        console.log('--Output with indexes--', resultIndexArray);
        // final output
        console.log('--Final Output--')
        for(index of resultIndexArray){
            resultArray.push(outputArr[index]);
        }

        return resultArray;
    }catch(e){      
        // return a Error message describing the reason     
        throw Error("Error while generating output in service.")
    }
    
}

exports.uploadFiles = async function(files){
    console.log('--Backend files--', files);
}    