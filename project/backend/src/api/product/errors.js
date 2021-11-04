const { BadRequest } = require ('../../utils').error;


class ProductDoesNotExist extends BadRequest {
    constructor (data) {
        super ('The product does not exist!', 'details');
    }
}

class ProductAlreadyExists extends BadRequest {
    constructor (data) {
        super ('The product already exists!', 'details');
    }
}

class CategoryDoesNotExist extends BadRequest {
    constructor (data) {
        super ('The category does not exist!', 'details');
    }
}

module.exports = {
    ProductAlreadyExists,
    ProductDoesNotExist,
    CategoryDoesNotExist
}