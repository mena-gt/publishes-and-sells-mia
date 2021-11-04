const { db } = require ('../../db.config');

const { ProfileRepository } = require ('../../../src/api/profile/repository.js');
const { fromSQLToProfile } = require ('../../../src/api/profile/model.js');


class ProfileKnexRepo extends ProfileRepository {
    constructor (q = db) {
        super ();
        this.q = q;
    }

    getOne (byCodeOrId) {
        return new Promise ((resolve, reject) => {
            this.q ('user')
                .join ('roles', 'user_role', '=', 'role_code')
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
                    'role_code',
                    'role_name',
                    'role_codename',
                    'role_description'
                )
                .where ({ user_code: byCodeOrId })
                .limit (1)
                .then ((rows) => {
                    if (0 < rows.length) {
                        resolve (fromSQLToProfile (rows[0]));
                    } else {
                        resolve (null);
                    }
                })
                .catch ((err) => reject (err));
        });
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
            });
        return this.getOne (userInstance.code);
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
    ProfileKnexRepo
};