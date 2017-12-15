var synaptic = require('synaptic');
var Jimp = require("jimp");
var fs = require('fs');

var IMG_SIZE = 15;
var IMG_UPLOAD_PATH = 'public/uploads/';
var IMG_SRC = '';
var IMG_DEST = '';
var IMG_INDEX = 0;
var IMG_CHARARR_STAGE_1 = '';
var IMG_CHARARR_STAGE_2 = [];
var IMG_CHARARR_STAGE_3 = [];
var NETWORK_ARRAY = [];
var NETWORK_INPUT_LAYERS = IMG_SIZE * IMG_SIZE; // IMG_SIZE^2
var NETWORK_HIDDEN_LAYERS = 5;
var NETWORK_OUTPUT_LAYERS = 5;
var NETWORK_ITERATION = 2000;
var NETWORK_LEARNING_RATE = .3;
var OUTPUT_DATA = {
  'A': [0,0,0,0,0],
  'B': [0,0,0,0,1]
};

// Saving the context of this module inside the _the variable
_this = this;
exports.trainNetwork = async function(trainingData){
  try{
    console.log('--DataSet--', trainingData.DataSet);    
    console.log('--TargetCharacter--', trainingData.TargetCharacter);
    console.log('--Output--', OUTPUT_DATA[trainingData.TargetCharacter]);
    if(trainingData.DataSet.length>0){
      NETWORK_ARRAY = [];
      readFileAndInitiate(IMG_INDEX);
    }
    return 'Success';
  }catch(e){
    // return a Error message describing the reason
    throw Error("Error while training the network in service.")
  }

  function readFileAndInitiate(i){
    if(i<trainingData.DataSet.length){
      IMG_SRC = IMG_UPLOAD_PATH + trainingData.DataSet[i];
      IMG_DEST = IMG_UPLOAD_PATH + 'BW_' + trainingData.DataSet[i];
      Jimp.read(IMG_SRC).then(function (image) {
        image.resize(IMG_SIZE, IMG_SIZE).greyscale().write(IMG_DEST, processBW, i)
      }).catch(function (err) {
        console.error(err);
      });
    }
    else{
      // create the network
      var Layer = synaptic.Layer;
      var Network = synaptic.Network;
      var inputLayer, hiddenLayer, outputLayer, myNetwork

      if (!fs.existsSync(IMG_UPLOAD_PATH+'myNetwork.json')) {
        inputLayer = new Layer(NETWORK_INPUT_LAYERS);
        hiddenLayer = new Layer(NETWORK_HIDDEN_LAYERS);
        outputLayer = new Layer(NETWORK_OUTPUT_LAYERS);
        inputLayer.project(hiddenLayer);
        hiddenLayer.project(outputLayer);
        myNetwork = new Network({
            input: inputLayer,
            hidden: [hiddenLayer],
            output: outputLayer
        });
      }
      else{
        let json = JSON.parse(fs.readFileSync(IMG_UPLOAD_PATH+'myNetwork.json'));
        myNetwork = Network.fromJSON(json);
      }

      // train the network
      var learningRate = NETWORK_LEARNING_RATE;
      for(var i=0; i<NETWORK_ITERATION; i++){
        for (var j=0; j<NETWORK_ARRAY.length; j++){
          myNetwork.activate(NETWORK_ARRAY[j]);
          myNetwork.propagate(learningRate, OUTPUT_DATA[trainingData.TargetCharacter]);
        }
      }
      var exported = myNetwork.toJSON();
      fs.writeFileSync(IMG_UPLOAD_PATH+'myNetwork.json', JSON.stringify(exported));      
      return 'Network trained successfully!';
    }
  }

  function processBW(i) {
    var pixelLog = '';
    IMG_CHARARR_STAGE_1 = '';
    IMG_CHARARR_STAGE_2 = [];
    IMG_CHARARR_STAGE_3 = [];
    Jimp.read(IMG_DEST).then(function (img) {
      let image = img.mirror(true, false).rotate(270);
      for(x=0; x<IMG_SIZE; x++){
        for(y=0; y<IMG_SIZE; y++){
          let pixelValue = Jimp.intToRGBA(image.getPixelColor(x, y));
          let pixelColor = 1;
          let r = pixelValue.r;
          let g = pixelValue.g;
          let b = pixelValue.b;
          //console.log('[',r,',',g,',',b,']');
          if((r+g+b) >=450) pixelColor = 0;
          pixelLog += pixelColor;
          IMG_CHARARR_STAGE_1 += pixelColor;
        }
        pixelLog += '\n';
      }
      console.log(pixelLog);
      IMG_CHARARR_STAGE_2 = IMG_CHARARR_STAGE_1.split('');
      for(let result of IMG_CHARARR_STAGE_2){
        IMG_CHARARR_STAGE_3.push(parseInt(result, 2));
      }
      //console.log(IMG_CHARARR_STAGE_3.length);
      NETWORK_ARRAY.push(IMG_CHARARR_STAGE_3);
      readFileAndInitiate(++IMG_INDEX);
    }).catch(function (err) {
        console.error(err);
    });
  }
}