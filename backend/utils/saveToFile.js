const fs = require('fs');
const path = require('path');

const saveToFile = (filePath) => {
    try {
        const fileName = filePath.split('/')[1]
        const uploadFolder = path.join(`./public/images/${fileName}`);
        fs.copyFile(filePath, uploadFolder, (error)=> console.log(error))
        return uploadFolder;
    } catch(error) {
        console.log(error)
    }

};

module.exports = saveToFile;