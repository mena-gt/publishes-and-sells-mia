const service = require ('./services');
const { validateUser } = require ('./validations.js');
const { user } = require ('../../sqldb');
const { Created,
        Deleted,
        Resource,
        Listing,
        Updated } = require ('../../utils').response;


const createUser = async (req, res, next) => {
    try {
        /*const dTO = await validateUser (
            req.body.name, 
            req.body.description, 
            req.body.parent
        );

        const repo = new user.UserSQLDBRepo ();
        const result = await service.create (repo, dTO);

        const httpResponse = new Created ({ user: result });
        return res.status (httpResponse.statusCode ())
            .json (httpResponse.toJson ());*/
    } catch (error) {
        next (error);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        /*const repo = new user.UserSQLDBRepo ()
        const result = await service.fetchAll (repo);
               
        const httpResponse = new Listing ({ users: result });
        return res.status (httpResponse.statusCode ())
            .json (httpResponse.toJson ());*/
    } catch (error) {
        next (error);
    }
}

const updateUser = async (req, res, next) => {
    try {
        /*const dTO = {
            name: req.body.name,
            description: req.body.description,
            parent: req.body.parent,
            code: req.params.code_or_id
        };
        
        const repo = new user.UserSQLDBRepo ()
        const result = await service.update (repo, dTO)
        
        const httpResponse = new Updated ({ user: result });
        return res.status (httpResponse.statusCode ())
            .json (httpResponse.toJson ());*/
    } catch (error) {
        next (error);
    }
}

const getOneUserById = async (req, res, next) => {
    try {
        /*const dTO = {
            code: req.params.code_or_id
        };
        
        const repo = new user.UserSQLDBRepo ()
        const result = await service.fetchOne (repo, dTO)
        
        const httpResponse = new Resource ({ user: result });
        return res.status (httpResponse.statusCode ())
            .json (httpResponse.toJson ());*/
    } catch (error) {
        next (error);
    }
}

const removeUser = async (req, res, next) => {
    try {
        /*const dTO = {
            code: req.params.code_or_id
        };
        
        const repo = new user.UserSQLDBRepo ()
        const result = await service.remove (repo, dTO);
        
        const httpResponse = new Deleted ();
        return res.status (httpResponse.statusCode ())
            .json (httpResponse.toJson ()); */
    } catch (error) {
        next (error);
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getOneUserById,
    removeUser,
    updateUser
};