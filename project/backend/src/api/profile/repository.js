
class ProfileRepository {
    constructor () {}

    exists (byEmail) {
        return new Promise ((resolve, reject) => {
            reject (new Error ('not implemented!'));
        });
    }

    add (userInstance) {
        return new Promise ((resolve, reject) => {
            reject (new Error ('not implemented!'));
        });
    }

    update (userInstance) {
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
    ProfileRepository
}