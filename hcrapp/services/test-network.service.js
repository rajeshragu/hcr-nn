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
var OUTPUT_DATA = {
  'A': [0,0,0,0,0],
  'B': [0,0,0,0,1]
};

// Saving the context of this module inside the _the variable
_this = this;
exports.testNetwork = async function(testData){
  try{
    console.log('--DataSet--', testData.DataSet);
    if(testData.DataSet.length>0){
      NETWORK_ARRAY = [];
      let outputStatus = await readFileAndInitiate(IMG_INDEX);
      console.log('--outputStatus from service--', outputStatus);
      return(outputStatus);
    }
  }catch(e){
    // return a Error message describing the reason
    throw Error("Error while training the network in service.")
  }

  function readFileAndInitiate(i){
    if(i<testData.DataSet.length){
      IMG_SRC = IMG_UPLOAD_PATH + testData.DataSet[i];
      IMG_DEST = IMG_UPLOAD_PATH + 'BW_' + testData.DataSet[i];
      Jimp.read(IMG_SRC).then(function (image) {
        image.resize(IMG_SIZE, IMG_SIZE).greyscale().write(IMG_DEST, processBW, i)
      }).catch(function (err) {
        console.error(err);
      });
    }
    else{
      var Network = synaptic.Network;
      var json = JSON.parse(fs.readFileSync(IMG_UPLOAD_PATH+'myNetwork.json'));
      var imported = Network.fromJSON(json);
      var resultRawArr = [];
      var resultIntArr = [];
      var resultIndexArray = [];
      var outputArr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
      var resultArray = [];
      resultRawArr.push(imported.activate(NETWORK_ARRAY[0]));      
      console.log('--In here 3--', resultRawArr);
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
      console.log(resultArray);
      return resultArray;
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