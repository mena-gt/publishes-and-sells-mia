const { ProductAlreadyExists, 
        ProductDoesNotExist } = require ('./errors.js');
const { buildClass } = require ('./model.js');


class FetchOneProduct {
    constructor (productRepo) {
        this.productRepo = productRepo;
    }

    fetchOne (request) {
        return new Promise (async (resolve, reject) => {
            const { code } = request;

            let existsProduct = await this.productRepo.exists (code);
            if (!existsProduct) {
                return reject (
                    new ProductDoesNotExist (code)
                );
            }

            let product = await this.productRepo.getOne (code);
            resolve (product);
        });
    }
}

class FetchAllProduct {
    constructor (productRepo) {
        this.productRepo = productRepo;
    }

    fetchAll () {
        return new Promise ((resolve, reject) => {
            this.productRepo.getAll ()
                .then ((result) => resolve (result))
                .catch (err => reject (err));
        });
    }

    fetchMyProducts (request) {
        return new Promise ((resolve, reject) => {
            const { user } = request;
            this.productRepo.myProducts (user)
                .then ((result) => resolve (result))
                .catch (err => reject (err));
        });
    }
}

class CreateProduct {
    constructor (productRepo, userRespo, categoryRepo) {
        this.productRepo = productRepo;
        this.userRepo = userRespo;
        this.categoryRepo = categoryRepo;
    }

    create (request) {
        return new Promise (async (resolve, reject) => {
            const {
                user,
                publish,
                sku,
                title,
                description,
                image,
                price,
                stock,
                category
            } = request;

            const slug = '-' + title + '-';
            let existsUser = await this.userRepo.exists (user);
            if (!existsUser) {
                reject (
                    new Error ('No existe el usuario')
                );
            }

            const userInstance = await this.userRepo.getOne (user);

            let existsCategory = await this.categoryRepo.exists (category);
            if (!existsCategory) {
                reject (
                    new Error ('No existe la categoria')
                );
            }

            const categoryInstance = await this.categoryRepo.getOne (category);

            const product = buildClass (
                sku, 
                title, 
                slug, 
                description, 
                image, 
                price, 
                stock,
                categoryInstance,
                userInstance
            );

            if (publish) {
                product.publish ()
            }

            const result = await this.productRepo.add (product);
            resolve (result);
        });
    }
}

class UpdateProduct {
    constructor () {}
    update (request) {
        return new Promise (async (resolve, reject) => {
            resolve (null);
        });  
    }
}

class RemoveProduct {
    constructor () {}
    remove (request) {
        return new Promise (async (resolve, reject) => {
            resolve (null);
        });
    }
}

module.exports = {
    FetchOneProduct,
    FetchAllProduct,
    CreateProduct,
    UpdateProduct,
    RemoveProduct
}