
class ColorRepo {
    constructor () {}

    exists (byName, byHexValue) {
        return new Promise ((resolve, reject) => {
            reject (new Error ('not implemented!'));
        });
    }

    getAll () {
        return new Promise ((resolve, reject) => {
            reject (new Error ('not implemented!'));
        });
    }

    add (colorInstance) {
        return new Promise ((resolve, reject) => {
            reject (new Error ('not implemented!'));
        });
    }

    update (colorInstance) {
        return new Promise ((resolve, reject) => {
            reject (new Error ('not implemented!'));
        });
    }

    getOneByHex (value) {
        return new Promise ((resolve, reject) => {
            reject (new Error ('not implemented!'));
        });
    }

    getOne (byCodeOrId) {
        return new Promise ((resolve, reject) => {
            reject (new Error ('not implemented!'));
        });
    }

    delete (byCodeOrId) {
        return new Promise ((resolve, reject) => {
            reject (new Error ('not implemented!'));
        });
    }
}

module.exports = {
    ColorRepo
}