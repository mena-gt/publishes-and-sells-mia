
class cartRepository {
    constructor () {}

    getOneByUserId (value) {
        return Promise.reject (new Error ('not implemented!'));
    }

    getAll () {
        return new Promise ((resolve, reject) => {
            reject (new Error ('not implemented!'));
        });
    }

    add (cartInstance) {
        return new Promise ((resolve, reject) => {
            reject (new Error ('not implemented!'));
        });
    }

    update (cartInstance) {
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
    cartRepo
}