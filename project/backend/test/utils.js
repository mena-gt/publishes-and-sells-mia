const fs = require ('fs');


const readInputData = (filename) => {
    return new Promise ((resolve, reject) => {
        fs.readFile (filename, (err, rawData) => {
            if (err) reject (err);
            else {
                try { 
                    const jsonData = JSON.parse (rawData)
                    resolve (jsonData); 
                } catch (err) { reject (err); }
            }
        });
    });
};

module.exports = {
    readInputData
};