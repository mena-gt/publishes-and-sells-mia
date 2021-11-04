// const service = require ('./services');
// const { validateProduct } = require ('./validations.js');
// const { product } = require ('../../sqldb');
const { Created,
        Deleted,
        Resource,
        Listing,
        Updated } = require ('../../utils').response;


const createProduct = async (req, res, next) => {
    try {
        /*const dTO = await validateProduct (
            req.body.name, 
            req.body.description, 
            req.body.parent
        );

        const repo = new product.ProductSQLDBRepo ();
        const result = await service.create (repo, dTO);

        const httpResponse = new Created ({ product: result });
        return res.status (httpResponse.statusCode ())
            .json (httpResponse.toJson ());*/
    } catch (err) {
        next (err);
    }
};

const getAllMyProducts = async (req, res, next) => {
    try {
        /*const repo = new product.ProductSQLDBRepo ()
        const result = await service.fetchAll (repo);
               
        const httpResponse = new Listing ({ products: result });
        return res.status (httpResponse.statusCode ())
            .json (httpResponse.toJson ());*/
    } catch (err) {
        next (err);
    }
}

const updateProduct = async (req, res, next) => {
    try {
        /*const dTO = {
            name: req.body.name,
            description: req.body.description,
            parent: req.body.parent,
            code: req.params.code_or_id
        };
        
        const repo = new product.ProductSQLDBRepo ()
        const result = await service.update (repo, dTO)
        
        const httpResponse = new Updated ({ product: result });
        return res.status (httpResponse.statusCode ())
            .json (httpResponse.toJson ());*/
    } catch (err) {
        next (err);
    }
}

const getOneProductById = async (req, res, next) => {
    try {
        /*const dTO = {
            code: req.params.code_or_id
        };
        
        const repo = new product.ProductSQLDBRepo ()
        const result = await service.fetchOne (repo, dTO)
        
        const httpResponse = new Resource ({ product: result });
        return res.status (httpResponse.statusCode ())
            .json (httpResponse.toJson ());*/
    } catch (err) {
        next (err);
    }
}

const removeProduct = async (req, res, next) => {
    try {
        /*const dTO = {
            code: req.params.code_or_id
        };
        
        const repo = new product.ProductSQLDBRepo ()
        const result = await service.remove (repo, dTO);
        
        const httpResponse = new Deleted ();
        return res.status (httpResponse.statusCode ())
            .json (httpResponse.toJson ()); */
    } catch (err) {
        next (err);
    }
}

module.exports = {
    createProduct,
    getAllMyProducts,
    getOneProductById,
    removeProduct,
    updateProduct
};