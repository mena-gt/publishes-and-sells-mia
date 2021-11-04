const { BadRequest } = require ('../../utils').error;


class UserDoesNotExist extends BadRequest {
    constructor (data) {
        super ('The user does not exist!', 'details');
    }
}

class UserAlreadyExists extends BadRequest {
    constructor (data) {
        super ('The user already exists!', 'details');
    }
}

module.exports = {
    UserAlreadyExists,
    UserDoesNotExist
}