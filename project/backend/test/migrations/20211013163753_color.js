
exports.up = function (knex) {
    return knex.schema.createTable('color', function (table) {
        table
            .increments('color_code');
        table
            .string('color_name');
        table
            .string('color_hex')
            .unique();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('color');
};
