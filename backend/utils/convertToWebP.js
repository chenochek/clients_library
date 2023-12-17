const { imageToWebp } = require("image-to-webp");

const convertToWebP = (fileName) => {
    try {
        const webpImage = imageToWebp(fileName, 30);
        return webpImage;
    } catch(error){
        console.log(error)
    }

};

module.exports = convertToWebP;