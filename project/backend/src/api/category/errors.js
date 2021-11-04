const { BadRequest } = require ('../../utils').error;


class ParentCategoryDoesNotExist extends BadRequest {
    constructor (data) {
        super ('The parent category does not exist!', 'details');
    }
}

class CategoryDoesNotExist extends BadRequest {
    constructor (data) {
        super ('The category does not exist!', 'details');
    }
}

class CategoryAlreadyExists extends BadRequest {
    constructor (data) {
        super ('The category already exists!', 'details');
    }
}

module.exports = {
    CategoryAlreadyExists,
    CategoryDoesNotExist,
    ParentCategoryDoesNotExist
}