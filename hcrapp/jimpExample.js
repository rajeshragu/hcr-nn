var Jimp = require("jimp");
var fs = require('fs');
var IMG_SIZE = 50;
var IMG_SRC = 'public/images/A.jpg';
var IMG_DEST = 'public/images/A-bw.jpg';
var TXT_NAME = 'public/images/pixel-log.txt'
Jimp.read(IMG_SRC).then(function (image) {
    image.resize(IMG_SIZE, IMG_SIZE).greyscale().write(IMG_DEST, processBW)
}).catch(function (err) {
    console.error(err);
});

function processBW() {
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
        fs.appendFile(TXT_NAME, pixelLog, function (err) {
            if (err) {
              console.log('not done');
            } else {
              console.log('done');
            }
          })
    }).catch(function (err) {
        console.error(err);
    });
}