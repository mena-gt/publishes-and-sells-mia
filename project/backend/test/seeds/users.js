
exports.seed = async function (knex) {
    await knex ('user_type').del ()
        .then (async function () {
            await knex ('user_type').insert ([
                {
                    usertype_code: 1,
                    usertype_name: 'Cuenta Diamante',
                    usertype_codename: 'DIAMOND_CLIENT',
                    usertype_amount: 50000.00
                },
                {
                    usertype_code: 2,
                    usertype_name: 'Cuenta Platino',
                    usertype_codename: 'PLATINUM_CLIENT',
                    usertype_amount: 25000.00
                },
                {
                    usertype_code: 3,
                    usertype_name: 'Cuenta Oro',
                    usertype_codename: 'GOLD_CLIENT',
                    usertype_amount: 10000.00
                },
                {
                    usertype_code: 4,
                    usertype_name: 'Cuenta Plata',
                    usertype_codename: 'SILVER_CLIENT',
                    usertype_amount: 5000.00
                },
                {
                    usertype_code: 5,
                    usertype_name: 'Cuenta Bronce',
                    usertype_codename: 'BRONZE_CLIENTE',
                    usertype_amount: 1000.00
                }
            ]);
        });
    await knex ('roles').del ()
        .then (async function () {
            await knex ('roles').insert ([
                {
                    role_code: 1, 
                    role_name: 'Administrator', 
                    role_codename: 'ADMIN_ROLE'
                },
                {
                    role_code: 2, 
                    role_name: 'Help Desk', 
                    role_codename: 'HELPDESK_ROLE'
                },
                {
                    role_code: 3, 
                    role_name: 'Client', 
                    role_codename: 'CLIENT_ROLE'
                }
            ]);
        });
    await knex ('account_status').del ()
        .then (async function () {
            await knex ('account_status').insert ([
                { 
                    status_code: 1, 
                    status_name: 'Activa',    
                    status_codename: 'ACTIVE_STATUS'
                },
                { 
                    status_code: 2, 
                    status_name: 'Inactiva',  
                    status_codename: 'INACTIVE_STATUS'
                },
                { 
                    status_code: 3, 
                    status_name: 'Congelada', 
                    status_codename: 'BLOCKED_STATUS'
                },
                { 
                    status_code: 4, 
                    status_name: 'Eliminada', 
                    status_codename: 'DELETED_ACCOUNT'
                }
            ]);
        });
    await knex ('user').del ()
        .then (async function () {
            await knex ('user').insert ([
                {
                    user_code: 1,
                    user_created: "2021-10-14 00:00:00",
                    user_updated: null,
                    user_lastlogin: null,
                    user_fname: 'User Firstname',
                    user_lname: 'User Lastname',
                    user_gender: 'M',
                    user_birthdate: null,
                    user_phonenum: null,
                    user_email: 'firstuser@none.com',
                    user_password: 'test@test',
                    user_image: null,
                    user_availablecredit: 0.00,
                    user_earnings: 0.00,
                    user_status: 1,
                    user_usertype: null,
                    user_role: 1
                },
                {
                    user_code: 2,
                    user_created: "2021-10-14 00:00:00",
                    user_updated: null,
                    user_lastlogin: null,
                    user_fname: 'User Secondname',
                    user_lname: 'User Lastname',
                    user_gender: 'F',
                    user_birthdate: null,
                    user_phonenum: null,
                    user_email: 'seconduser@none.com',
                    user_password: 'test@test',
                    user_image: null,
                    user_availablecredit: 0.00,
                    user_earnings: 0.00,
                    user_status: 2,
                    user_usertype: null,
                    user_role: 2
                },
                {
                    user_code: 3,
                    user_created: "2021-10-14 00:00:00",
                    user_updated: null,
                    user_lastlogin: null,
                    user_fname: 'User Thirdname',
                    user_lname: 'User Lastname',
                    user_gender: 'F',
                    user_birthdate: null,
                    user_phonenum: null,
                    user_email: 'thirduser@none.com',
                    user_password: 'test@test',
                    user_image: null,
                    user_availablecredit: 0.00,
                    user_earnings: 0.00,
                    user_status: 3,
                    user_usertype: null,
                    user_role: 1
                },
                {
                    user_code: 4,
                    user_created: "2021-10-14 00:00:00",
                    user_updated: null,
                    user_lastlogin: null,
                    user_fname: 'User fourthname',
                    user_lname: 'User Lastname',
                    user_gender: 'F',
                    user_birthdate: null,
                    user_phonenum: null,
                    user_email: 'fourthuser@none.com',
                    user_password: 'test@test',
                    user_image: null,
                    user_availablecredit: 0.00,
                    user_earnings: 0.00,
                    user_status: 4,
                    user_usertype: null,
                    user_role: 2
                },
                {
                    user_code: 5,
                    user_created: "2021-10-14 00:00:00",
                    user_updated: null,
                    user_lastlogin: null,
                    user_fname: 'Firstname Client1',
                    user_lname: 'Lastname Client1',
                    user_gender: 'M',
                    user_birthdate: null,
                    user_phonenum: null,
                    user_email: 'client1@none.com',
                    user_password: 'test@test',
                    user_image: null,
                    user_availablecredit: 0.00,
                    user_earnings: 0.00,
                    user_status: 1,
                    user_usertype: 2,
                    user_role: 3
                },
                {
                    user_code: 6,
                    user_created: "2021-10-14 00:00:00",
                    user_updated: null,
                    user_lastlogin: null,
                    user_fname: 'Firstname Client2',
                    user_lname: 'Lastname Client2',
                    user_gender: 'M',
                    user_birthdate: null,
                    user_phonenum: null,
                    user_email: 'client2@none.com',
                    user_password: 'test@test',
                    user_image: null,
                    user_availablecredit: 0.00,
                    user_earnings: 0.00,
                    user_status: 1,
                    user_usertype: 3,
                    user_role: 3                    
                }
            ]);
        });
};