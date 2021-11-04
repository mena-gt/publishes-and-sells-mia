const service = require ('./services');
// const { validateUser } = require ('./validations.js');
// const { user } = require ('../../sqldb');
const { Created,
        Deleted,
        Resource,
        Listing,
        Updated } = require ('../../utils').response;


const signup = async (req, res, next) => {
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

const signin = async (req, res, next) => {
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

const signout = async (req, res, next) => {
    try {
        const dTO = await validateUser (
            req.body.name, 
            req.body.description, 
            req.body.parent
        );

        const repo = new user.UserSQLDBRepo ();
        const result = await service.create (repo, dTO);

        const httpResponse = new Created ({ user: result });
        return res.status (httpResponse.statusCode ())
            .json (httpResponse.toJson ());
    } catch (error) {
        next (error);
    }
};

module.exports = {

};