const service = require ('./services');
const { validateCategory } = require ('./validations.js');
const { category } = require ('../../sqldb');
const { Created,
        Deleted,
        Resource,
        Listing,
        Updated } = require ('../../utils').response;


const createCategory = async (req, res, next) => {
    try {
        const dTO = await validateCategory (
            req.body.name, 
            req.body.description, 
            req.body.parent
        );

        const repo = new category.CategorySQLDBRepo ();
        const result = await service.create (repo, dTO);

        const httpResponse = new Created ({ category: result });
        return res.status (httpResponse.statusCode ())
            .json (httpResponse.toJson ());
    } catch (err) {
        next (err);
    }
};

const getAllCategories = async (req, res, next) => {
    try {
        const repo = new category.CategorySQLDBRepo ()
        const result = await service.fetchAll (repo);
               
        const httpResponse = new Listing ({ categories: result });
        return res.status (httpResponse.statusCode ())
            .json (httpResponse.toJson ());
    } catch (err) {
        next (err);
    }
}

const updateCategory = async (req, res, next) => {
    try {
        const dTO = {
            name: req.body.name,
            description: req.body.description,
            parent: req.body.parent,
            code: req.params.code_or_id
        };
        
        const repo = new category.CategorySQLDBRepo ()
        const result = await service.update (repo, dTO)
        
        const httpResponse = new Updated ({ category: result });
        return res.status (httpResponse.statusCode ())
            .json (httpResponse.toJson ());
    } catch (err) {
        next (err);
    }
}

const getOneCategoryById = async (req, res, next) => {
    try {
        const dTO = {
            code: req.params.code_or_id
        };
        
        const repo = new category.CategorySQLDBRepo ()
        const result = await service.fetchOne (repo, dTO)
        
        const httpResponse = new Resource ({ category: result });
        return res.status (httpResponse.statusCode ())
            .json (httpResponse.toJson ());
    } catch (err) {
        next (err);
    }
}

const removeCategory = async (req, res, next) => {
    try {
        const dTO = {
            code: req.params.code_or_id
        };
        
        const repo = new category.CategorySQLDBRepo ()
        const result = await service.remove (repo, dTO);
        
        const httpResponse = new Deleted ();
        return res.status (httpResponse.statusCode ())
            .json (httpResponse.toJson ()); 
    } catch (err) {
        next (err);
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    getOneCategoryById,
    removeCategory,
    updateCategory
};