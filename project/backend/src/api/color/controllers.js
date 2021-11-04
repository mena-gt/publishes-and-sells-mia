const service = require ('./services');
const { validateColor } = require ('./validations.js');
const { color } = require ('../../sqldb');
const { Created,
        Deleted,
        Resource,
        Listing,
        Updated } = require ('../../utils').response;


const createColor = async (req, res, next) => {
    try {
        const dTO = await validateColor (
            req.body.name, 
            req.body.hex
        );

        const repo = new color.ColorSQLDBRepo ();
        const result = await service.create (repo, dTO);

        const httpResponse = new Created ({ color: result });
        return res.status (httpResponse.statusCode ())
            .json (httpResponse.toJson ());
    } catch (error) {
        next (error);
    }
};

const getAllColors = async (req, res, next) => {
    try {
        const repo = new color.ColorSQLDBRepo ()
        const result = await service.fetchAll (repo);
               
        const httpResponse = new Listing ({ colors: result });
        return res.status (httpResponse.statusCode ())
            .json (httpResponse.toJson ());
    } catch (error) {
        next (error);
    }
}

const updateColor = async (req, res, next) => {
    try {
        const dTO = {
            name: req.body.name,
            description: req.body.description,
            parent: req.body.parent,
            code: req.params.code_or_id
        };
        
        const repo = new color.ColorSQLDBRepo ()
        const result = await service.update (repo, dTO)
        
        const httpResponse = new Updated ({ color: result });
        return res.status (httpResponse.statusCode ())
            .json (httpResponse.toJson ());
    } catch (error) {
        next (error);
    }
}

const getOneColorById = async (req, res, next) => {
    try {
        const dTO = {
            code: req.params.code_or_id
        };
        
        const repo = new color.ColorSQLDBRepo ()
        const result = await service.fetchOne (repo, dTO)
        
        const httpResponse = new Resource ({ color: result });
        return res.status (httpResponse.statusCode ())
            .json (httpResponse.toJson ());
    } catch (error) {
        next (error);
    }
}

const removeColor = async (req, res, next) => {
    try {
        const dTO = {
            code: req.params.code_or_id
        };
        
        const repo = new color.ColorSQLDBRepo ()
        const result = await service.remove (repo, dTO);
        
        const httpResponse = new Deleted ();
        return res.status (httpResponse.statusCode ())
            .json (httpResponse.toJson ()); 
    } catch (error) {
        next (error);
    }
}

module.exports = {
    createColor,
    getAllColors,
    getOneColorById,
    removeColor,
    updateColor
};