
class CategoryRepo {
    constructor () {}

    exists (byName) {
        return new Promise ((resolve, reject) => {
            reject (new Error ('not implemented!'));
        });
    }

    existsParent (byCodeOrId) {
        return new Promise ((resolve, reject) => {
            reject (new Error ('not implemented!'));
        });
    }

    getAll () {
        return new Promise ((resolve, reject) => {
            reject (new Error ('not implemented!'));
        });
    }

    add (categoryInstance) {
        return new Promise ((resolve, reject) => {
            reject (new Error ('not implemented!'));
        });
    }

    update (categoryInstance) {
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
    CategoryRepo
}