const knex = require ('knex');
const configs = require ('./knexfile.js');


const db = knex (configs.testing);

const createTables = function (filename) {
    return new Promise (async (resolve) => {
        await db.migrate.latest (filename);
        resolve ();
    });
};

const dropTables = function () {
    return new Promise (async (resolve) => {
        await db.migrate.rollback ();
        resolve ();
    });
};

module.exports = {
    createTables,
    db,
    dropTables
};