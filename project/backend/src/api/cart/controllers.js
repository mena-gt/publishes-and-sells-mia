const service = require ('./services');
const { validateCart } = require ('./validations.js');
const { cart } = require ('../../sqldb');
const { Created,
        Deleted,
        Resource,
        Listing,
        Updated } = require ('../../utils').response;


const updateCart = async (req, res, next) => {
    try {
        const dTO = {
            name: req.body.name,
            description: req.body.description,
            parent: req.body.parent,
            code: req.params.code_or_id
        };
        
        const repo = new cart.CartSQLDBRepo ()
        const result = await service.update (repo, dTO)
        
        const httpResponse = new Updated ({ cart: result });
        return res.status (httpResponse.statusCode ())
            .json (httpResponse.toJson ());
    } catch (error) {
        next (error);
    }
}

const getCart = async (req, res, next) => {
    try {
        const dTO = {
            code: req.params.code_or_id
        };
        
        const repo = new cart.CartSQLDBRepo ()
        const result = await service.fetchOne (repo, dTO)
        
        const httpResponse = new Resource ({ cart: result });
        return res.status (httpResponse.statusCode ())
            .json (httpResponse.toJson ());
    } catch (error) {
        next (error);
    }
}

module.exports = {
    getCart,
    updateCart
};