const { db } = require ('../../db.config');

const { RoleRepository,
        TypeRepository,
        StatusRepository,
        UserRepository } = require ('../../../src/api/authn/repository.js');
const { fromSQLToRole,
        fromSQLToAccountType,
        fromSQLToStatus,
        fromSQLToUser } = require ('../../../src/api/authn/model.js');

class RoleKnexRepo extends RoleRepository {
    constructor (q = db) {
        super ();
        this.q = q;
    }

    getClientRole () {
        return new Promise ((resolve, reject) => {
            this.q ('roles')
                .select ('*')
                .where ({ role_codename: 'CLIENT_ROLE' })
                .limit (1)
                .then ((rows) => {
                    if (0 < rows.length) {
                        resolve (fromSQLToRole (rows[0]));
                    } else {
                        resolve (null);
                    }
                })
                .catch ((err) => reject (err));
        });
    }
}

class TypeKnexRepo extends TypeRepository {
    constructor (q = db) {
        super ();
        this.q = q;
    }

    getAll () {
        return new Promise ((resolve, reject) => {
            this.q ('user_type')
                .select ('*')
                .then ((rows) => {
                    const types = rows.map ((row) => fromSQLToAccountType (row));
                    resolve (types);
                })
                .catch ((err) => reject (err));
        });
    }
}

class StatusKnexRepo extends StatusRepository {
    constructor (q = db) {
        super ();
        this.q = q;
    }

    getInactiveStatus () {
        return new Promise ((resolve, reject) => {
            this.q ('account_status')
                .select ('*')
                .where ({ status_codename: 'INACTIVE_STATUS' })
                .limit (1)
                .then ((rows) => {
                    if (0 < rows.length) {
                        resolve (fromSQLToStatus (rows[0]));
                    } else {
                        resolve (null);
                    }
                })
                .catch ((err) => reject (err));
        });
    }
}

class UserKnexRepo extends UserRepository {
    constructor (q = db) {
        super ();
        this.q = q;
    }

    exists (byEmail) {
        return new Promise ((resolve, reject) => {
            this.q ('user')
                .select ('user_code')
                .where ({ user_email: byEmail })
                .limit (1)
                .then ((rows) => resolve (0 < rows.length))
                .catch ((err) => reject (err));
        });
    }

    getOneByEmail (value) {
        return new Promise ((resolve, reject) => {
            this.q ('user')
                .join ('roles', 'user_role', '=', 'role_code')
                .join ('account_status', 'user_status', '=', 'status_code')
                .join ('user_type', 'user_usertype', '=', 'usertype_code')
                .select (
                    'user_code',
                    'user_created',
                    'user_updated',
                    'user_lastlogin',
                    'user_fname',
                    'user_lname',
                    'user_gender',
                    'user_birthdate',
                    'user_phonenum',
                    'user_email',
                    'user_image',
                    'user_password',
                    'user_availablecredit',
                    'user_earnings',
                    'usertype_code',
                    'usertype_name',
                    'usertype_codename',
                    'usertype_amount',
                    'role_code',
                    'role_name',
                    'role_codename',
                    'role_description',
                    'status_code',
                    'status_name',
                    'status_codename'
                )
                .where ({ user_email: value })
                .limit (1)
                .then ((rows) => {
                    if (0 < rows.length) {
                        resolve (fromSQLToUser (rows[0]));
                    } else {
                        resolve (null);
                    }
                })
                .catch ((err) => reject (err));
        });
    }

    async add (userInstance) {
        await this.q ('user')
            .insert ({
                user_created: userInstance.createdAt,
                user_fname: userInstance.firstName,
                user_lname: userInstance.lastName,
                user_email: userInstance.email,
                user_password: userInstance.password,
                user_availablecredit: userInstance.availableCredit,
                user_earnings: userInstance.earnings,
                user_status: userInstance.accountStatus.code,
                user_usertype: userInstance.accountType.code,
                user_role: userInstance.role.code
            });
        return this.getOneByEmail (userInstance.email);
    }
}

module.exports = {
    RoleKnexRepo,
    TypeKnexRepo,
    StatusKnexRepo,
    UserKnexRepo
}