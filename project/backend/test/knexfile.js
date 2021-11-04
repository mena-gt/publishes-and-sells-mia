// Update with your config settings.
// For create migrations:
//     npx knex migrate:make --env testing <name>
// For create seeds:
//     npx knex seed:make --env testing <name>
const path = require('path');


module.exports = {
    testing: {
        client: 'sqlite3',
        connection: ":memory:",
        //connection: {
        //    filename: path.join (__dirname, '..', "db.sqlite3")
        //},
        useNullAsDefault: true,
        migrations: {
            directory: path.join (__dirname, 'migrations')
        },
        seeds: {
            directory: path.join (__dirname, 'seeds')
        }
    }
};
