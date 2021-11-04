
exports.up = async function (knex) {
    await knex.schema.createTable ('product', function (table) {
        table
            .increments ('product_code');
        table
            .datetime ('product_created')
            .defaultTo (knex.fn.now ())
            .notNullable ();
        table
            .datetime ('product_updated')
            .defaultTo (null)
            .nullable ();
        table
            .datetime ('product_published')
            .defaultTo (null)
            .nullable ();
        table
            .boolean ('product_publish')
            .defaultTo (false)
            .notNullable ();
        table
            .string ('product_sku')
            .notNullable ();
        table
            .string ('product_title')
            .notNullable ();
        table
            .string ('product_slug')
            .unique ()
            .notNullable ();
        table
            .text ('product_description')
            .notNullable ();
        table
            .string ('product_image')
            .nullable ();
        table
            .decimal ('product_price', 15, 2)
            .defaultTo (0.00)
            .notNullable ();
        table
            .integer ('product_stock')
            .notNullable ();
        table
            .decimal ('product_rating', 5, 2)
            .defaultTo (0.00)
            .notNullable ();
        table
            .string ('product_category')
            .defaultTo (null)
            .nullable ()
            .references('category_code')
            .inTable('category')
            .onUpdate('RESTRICT')
            .onDelete('SET NULL');
        table
            .string ('product_owner')
            .notNullable ()
            .references('user_code')
            .inTable('user')
            .onUpdate('RESTRICT')
            .onDelete('CASCADE');
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTable('product');
};
