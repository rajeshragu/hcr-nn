var synaptic = require('synaptic');
var Jimp = require("jimp");

var IMG_SIZE = 50;
var IMG_UPLOAD_PATH = 'public/uploads/';
var IMG_SRC = '';
var IMG_DEST = '';
var IMG_INDEX = 0;
// Saving the context of this module inside the _the variable
_this = this;
exports.trainNetwork = async function(trainingData){
  try{
    if(trainingData.DataSet.length>0){
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
  }

  function processBW(i) {
    var pixelLog = '';
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
        }
        pixelLog += '\n';
      }
      console.log(pixelLog);
      readFileAndInitiate(++IMG_INDEX);
    }).catch(function (err) {
        console.error(err);
    });
  }
}