const { db } = require ('../../db.config');

const { RoleRepository, 
        StatusRepository, 
        UserRepository } = require ('../../../src/api/user/repository.js');
const { fromSQLToRole,
        fromSQLToStatus,
        fromSQLToUser } = require ('../../../src/api/user/model.js');


class RoleKnexRepo extends RoleRepository {
    constructor (q = db) {
        super ();
        this.q = q;
    }

    exists (byCodeOrId) {
        return new Promise ((resolve, reject) => {
            this.q ('roles')
                .select ('role_code')
                .where ({ role_code: byCodeOrId })
                .limit (1)
                .then ((rows) => resolve (0 < rows.length))
                .catch ((err) => reject (err));
        });
    }

    getOne (byCodeOrId) {
        return new Promise ((resolve, reject) => {
            this.q ('roles')
                .select ('*')
                .where ({ role_code: byCodeOrId })
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

class StatusKnexRepo extends StatusRepository {
    constructor (q = db) {
        super ();
        this.q = q;
    }

    exists (byCodeOrId) {
        return new Promise ((resolve, reject) => {
            this.q ('account_status')
                .select ('status_code')
                .where ({ status_code: byCodeOrId })
                .limit (1)
                .then ((rows) => resolve (0 < rows.length))
                .catch ((err) => reject (err));
        });
    }

    getOne (byCodeOrId) {
        return new Promise ((resolve, reject) => {
            this.q ('account_status')
                .select ('*')
                .where ({ status_code: byCodeOrId })
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

    getOneByEmail (value) {
        return new Promise ((resolve, reject) => {
            this.q ('user')
                .join ('roles', 'user_role', '=', 'role_code')
                .join ('account_status', 'user_status', '=', 'status_code')
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
                    'user_status',
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

    getOne (byCodeOrId) {
        return new Promise ((resolve, reject) => {
            this.q ('user')
                .join ('roles', 'user_role', '=', 'role_code')
                .join ('account_status', 'user_status', '=', 'status_code')
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
                    'user_status',
                    'role_code',
                    'role_name',
                    'role_codename',
                    'role_description',
                    'status_code',
                    'status_name',
                    'status_codename'
                )
                .where ({ user_code: byCodeOrId })
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

    getAll () {
        return new Promise ((resolve, reject) => {
            this.q ('user')
                .join ('roles', 'user_role', '=', 'role_code')
                .join ('account_status', 'user_status', '=', 'status_code')
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
                    'user_status',
                    'role_code',
                    'role_name',
                    'role_codename',
                    'role_description',
                    'status_code',
                    'status_name',
                    'status_codename'
                )
                .then ((rows) => {
                    const users = rows.map ((row) => fromSQLToUser (row));
                    resolve (users);
                })
                .catch ((err) => reject (err));
        });
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

    async add (userInstance) {
        await this.q ('user')
            .insert ({
                user_created: userInstance.createdAt,
                user_fname: userInstance.firstName,
                user_lname: userInstance.lastName,
                user_gender: userInstance.gender,
                user_birthdate: userInstance.birthDate,
                user_phonenum: userInstance.phoneNumber,
                user_email: userInstance.email,
                user_image: userInstance.image,
                user_password: userInstance.password,
                user_status: userInstance.accountStatus.code,
                user_role: userInstance.role.code
            });
        return this.getOneByEmail (userInstance.email);
    }

    async update (userInstance) {
        await this. q ('user')
            .where ('user_code', '=', userInstance.code)
            .update({
                user_updated: userInstance.updatedAt,
                user_fname: userInstance.firstName,
                user_lname: userInstance.lastName,
                user_gender: userInstance.gender,
                user_birthdate: userInstance.birthDate,
                user_phonenum: userInstance.phoneNumber,
                user_image: userInstance.image,
                user_role: userInstance.role.code
            });
        return this.getOneByEmail (userInstance.email);
    }

    delete (byCodeOrId) {
        return new Promise ((resolve, reject) => {
            this.q ('user')
                .where (this.q.raw ('user_code = ?', [byCodeOrId]))
                .del ()
                .then ((result) => resolve (0 < result))
                .catch ((err) => reject (err));
        });
    }
}

module.exports = {
    RoleKnexRepo,
    StatusKnexRepo,
    UserKnexRepo
};