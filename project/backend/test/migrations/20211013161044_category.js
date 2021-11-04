
exports.up = function (knex) {
    return knex.schema.createTable('category', function (table) {
        table
            .increments('category_code');
        table
            .string('category_name')
            .unique();
        table
            .string('category_description');
        table
            .integer('category_parent')
            .defaultTo(null)
            .references('category_code')
            .inTable('category')
            .onUpdate('RESTRICT')
            .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('category');
};
