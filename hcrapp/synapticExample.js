var synaptic = require('synaptic');
var fs = require('fs');
// create the network
var Layer = synaptic.Layer;
var Network = synaptic.Network;
var inputLayer = new Layer(2);
var hiddenLayer = new Layer(3);
var outputLayer = new Layer(1);
inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);
var myNetwork = new Network({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer
});
// train the network
var learningRate = .3;
for(var i=0; i<2000; i++){
    myNetwork.activate([0,0]);
    myNetwork.propagate(learningRate, [0]);
    myNetwork.activate([0,1]);
    myNetwork.propagate(learningRate, [0]);
    myNetwork.activate([1,0]);
    myNetwork.propagate(learningRate, [0]);
    myNetwork.activate([1,1]);
    myNetwork.propagate(learningRate, [1]);  
}
var exported = myNetwork.toJSON();
console.log("Going to open an network file");
fs.open('output.json', 'a+', function(err, fd) {
   if (err) {
      return console.error(err);
   }
   console.log("File opened successfully!");
   console.log("Going to append the file");
   fs.appendFileSync(fd, JSON.stringify(exported));
   console.log(myNetwork.activate([1,1]));
});