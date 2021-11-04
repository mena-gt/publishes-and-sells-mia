const { BadRequest } = require ('../../utils').error;


class RoleDoesNotExist extends BadRequest {
    constructor (data) {
        super ('The role does not exist!', 'details');
    } 
}

class AccountStatusDoesNotExist extends BadRequest {
    constructor (data) {
        super ('The account status does not exist!', 'details');
    } 
}

class UserDoesNotExist extends BadRequest {
    constructor (data) {
        super ('The user does not exist!', 'details');
    }
}

class UserAlreadyExists extends BadRequest {
    constructor (data) {
        super ('The user\'s email already exists!', 'details');
    }
}

module.exports = {
    RoleDoesNotExist,
    AccountStatusDoesNotExist,
    UserAlreadyExists,
    UserDoesNotExist
}