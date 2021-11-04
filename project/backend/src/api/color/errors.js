const { BadRequest } = require ('../../utils').error;


class ColorDoesNotExist extends BadRequest {
    constructor (data) {
        super ('The color does not exist!', 'details');
    }
}

class ColorAlreadyExists extends BadRequest {
    constructor (name, hexvalue) {
        super ('The color already exists!', 'details');
    }
}

module.exports = {
    ColorAlreadyExists,
    ColorDoesNotExist

}