
exports.up = async function (knex) {
    await knex.schema.createTable ('user_type', function (table) {
        table
            .increments ('usertype_code');
        table
            .string ('usertype_name')
            .notNullable ();
        table
            .string ('usertype_codename')
            .unique ()
            .notNullable ();
        table
            .decimal ('usertype_amount', 15, 2)
            .defaultTo (0.00)
            .notNullable ();
    });

    await knex.schema.createTable('roles', function (table) {
        table
            .increments ('role_code');
        table
            .string ('role_name')
            .notNullable ();
        table
            .string ('role_codename')
            .unique ()
            .notNullable ();
        table
            .string ('role_description')
            .nullable ();
    });

    await knex.schema.createTable('account_status', function (table) {
        table
            .increments ('status_code');
        table
            .string ('status_name');
        table
            .string ('status_codename')
            .unique ();
    });

    await knex.schema.createTable('user', function (table) {
        table
            .increments ('user_code');
        table
            .datetime ('user_created')
            .defaultTo (knex.fn.now ())
            .notNullable ();
        table
            .datetime ('user_updated')
            .defaultTo (null)
            .nullable ();
        table
            .datetime ('user_lastlogin')
            .defaultTo (null)
            .nullable ();
        table
            .string ('user_fname')
            .notNullable ();
        table
            .string ('user_lname')
            .notNullable ();
        table
            .string ('user_gender')
            .defaultTo (null)
            .nullable ();
        table
            .date ('user_birthdate')
            .defaultTo (null)
            .nullable ();
        table
            .string ('user_phonenum')
            .defaultTo (null)
            .nullable ();
        table
            .string ('user_email')
            .notNullable()
            .unique ();
        table
            .string ('user_password')
            .notNullable ();
        table
            .string ('user_image')
            .defaultTo (null)
            .nullable ();
        table
            .decimal ('user_availablecredit', 15, 2)
            .defaultTo (0.00)
            .nullable ();
        table
            .decimal ('user_earnings', 15, 2)
            .defaultTo (0.00)
            .nullable ();
        table
            .integer ('user_status')
            .defaultTo (null)
            .nullable ()
            .references('status_code')
            .inTable('account_status')
            .onUpdate('RESTRICT')
            .onDelete('SET NULL');
        table
            .integer ('user_usertype')
            .defaultTo (null)
            .nullable ()
            .references('usertype_code')
            .inTable('user_type')
            .onUpdate('RESTRICT')
            .onDelete('SET NULL');
        table
            .integer ('user_role')
            .defaultTo (null)
            .nullable ()
            .references('role_code')
            .inTable('roles')
            .onUpdate('RESTRICT')
            .onDelete('SET NULL');
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTable('user');
    await knex.schema.dropTable('account_status');
    await knex.schema.dropTable('roles');
    await knex.schema.dropTable('user_type');
};
