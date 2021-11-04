const { BadRequest } = require ('../../utils').error;


class CartDoesNotExist extends BadRequest {
    constructor (data) {
        super ('The cart does not exist!', 'details');
    }
}

class CartAlreadyExists extends BadRequest {
    constructor (data) {
        super ('The cart already exists!', 'details');
    }
}

module.exports = {
    CartAlreadyExists,
    CartDoesNotExist
}