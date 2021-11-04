const { CartAlreadyExists, 
        CartDoesNotExist, 
        ParentCartDoesNotExist } = require ('./errors.js');
const { buildClass } = require ('./model.js');


class CartDetails {
    constructor (cartRepository) {
        this.cartRepo = cartRepository;
    }

    getAll (request) {
        return new Promise ((resolve, reject) => {
            const { user } = request;
            resolve (null);
        });
    }
}

class UpdateCart {
    constructor (cartRepository, productRepository) {}
    increaseOrDecrease (request) {}
}

const create = (repo, dTO) => {
    return new Promise (async (resolve, reject) => {
        let exists = await repo.exists (dTO.name);
        if (exists) {
            return reject (
                new CartAlreadyExists (dTO.name)
            );
        }

        if (dTO.parent !== undefined &&
            !(exists = await repo.existsParent (dTO.parent))) {
            return reject (
                new ParentCartDoesNotExist (dTO.parent)
            );
        }

        let cart = buildClass (dTO.name, dTO.description, dTO.parent);
        const result = await repo.add (cart)

        resolve (result);
    });
};

const fetchAll = (repo) => {
    return new Promise ((resolve, reject) => {
        repo.getAll ()
            .then ((result) => resolve (result))
            .catch (err => reject (err));
    });
}

const update = (repo, dTO) => {
    return new Promise (async (resolve, reject) => {
        const cart = await repo.getOne (dTO.code);
        if (!cart) {
            return reject (
                new CartDoesNotExist (dTO.code)
            );
        }
        
        let exists = true;
        if (cart.name !== dTO.name && 
           (exists = repo.exists (dTO.name))) {
            return reject (
                new CartAlreadyExists (dTO.name)
            );
        }

        if (dTO.parent !== undefined && 
            cart.parent !== dTO.parent &&
            !(exists = await repo.existsParent (dTO.parent))) {
            return reject (
                new ParentCartDoesNotExist (dTO.parent)
            );
        }

        cart.update (dTO.name, dTO.description, dTO.parent);
        const result = await repo.update (cart);
        resolve (result);
    });
};

const fetchOne = (repo, dTO) => {
    return new Promise ((resolve, reject) => {
        repo.getOne (dTO.code)
            .then ((result) => {
                if (result === null) {
                    return reject (
                        new CartDoesNotExist (dTO.code)
                    );
                }
                resolve (result);
            })
            .catch (err => reject (err));
    });
}

const remove = (repo, dTO) => {
    return new Promise ((resolve, reject) => {
        repo.delete (dTO.code)
            .then ((result) => {
                if (!result) {
                    return reject (
                        new CartDoesNotExist (dTO.code)
                    );
                }
                resolve (result);
            })
            .catch (err => reject (err));
    });
}

module.exports = {
    create,
    fetchAll,
    fetchOne,
    remove,
    update
}