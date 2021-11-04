const { UserAlreadyExists, 
        UserDoesNotExist,
        RoleDoesNotExist } = require ('./errors.js');
const { buildClass } = require ('./model.js');


class FetchOneUser {
    constructor (roleRepo, statusRepo, userRepo) {
        this.roleRepo = roleRepo;
        this.statusRepo = statusRepo;
        this.userRepo = userRepo;
    }

    fetchOne (request) {
        return new Promise ((resolve, reject) => {
            const { code } = request;
            this.userRepo.getOne (code)
                .then ((result) => {
                    if (result === null) {
                        return reject (
                            new UserDoesNotExist (code)
                        );
                    }
                    resolve(result);
                })
                .catch (err => reject (err));
        });
    }
}

class FetchAllUser {
    constructor (roleRepo, statusRepo, userRepo) {
        this.roleRepo = roleRepo;
        this.statusRepo = statusRepo;
        this.userRepo = userRepo;
    }

    fetchAll () {
        return new Promise ((resolve, reject) => {
            this.userRepo.getAll ()
                .then ((result) => resolve(result))
                .catch (err => reject (err));
        });
    }
}

class CreateUser {
    constructor (roleRepo, statusRepo, userRepo) {
        this.roleRepo = roleRepo;
        this.statusRepo = statusRepo;
        this.userRepo = userRepo;
    }

    create (request) {
        return new Promise (async (resolve, reject) => {
            const { 
                firstname, 
                lastname, 
                gender, 
                birthdate, 
                phonenumber, 
                email, 
                password, 
                image,
                role } = request;
            
            let existsRole = await this.roleRepo.exists (role);
            if (!existsRole) {
                return reject (new RoleDoesNotExist (role));
            }

            let existsUserEmail = await this.userRepo.exists (email);
            if (existsUserEmail) {
                return reject (new UserAlreadyExists (email));
            }
            
            // const encrypedPassword = this.encryp (password);
            const roleInstance = await this.roleRepo.getOne (role);

            const statusInstance = await this.statusRepo.getInactiveStatus ();
            if (!statusInstance) {
                return reject (new Error ('no existe el status'));
            }

            const user = buildClass (
                firstname, 
                lastname, 
                gender, 
                birthdate, 
                phonenumber, 
                email, 
                image, 
                password, 
                statusInstance, 
                roleInstance
            );
            
            const result = await this.userRepo.add (user);
            resolve (result);
        });
    }
}

class UpdateUser {
    constructor (roleRepo, statusRepo, userRepo) {
        this.roleRepo = roleRepo;
        this.statusRepo = statusRepo;
        this.userRepo = userRepo;
    }

    update (request) {
        return new Promise (async (resolve, reject) => {
            const { 
                code,
                firstname, 
                lastname, 
                gender, 
                birthdate, 
                phonenumber,
                image,
                role } = request;
            
            let user = await this.userRepo.getOne (code);
            if (!user) {
                return reject (new UserDoesNotExist (code));
            }

            let existsRole = false;
            if (user.role.code !== role &&
                !(existsRole = await this.roleRepo.exists (role))) {
                return reject (new RoleDoesNotExist (role));
            }

            const roleInstance = await this.roleRepo.getOne (role);

            user.update (
                firstname,
                lastname,
                gender,
                birthdate,
                phonenumber,
                image,
                roleInstance
            );
            
            const result = await this.userRepo.update (user);
            resolve (result);
        });
    }
}

class RemoveUser {
    constructor (roleRepo, statusRepo, userRepo) {
        this.roleRepo = roleRepo;
        this.statusRepo = statusRepo;
        this.userRepo = userRepo;
    }

    remove (request) {
        return new Promise ((resolve, reject) => {
            const { code } = request;
            this.userRepo.delete (code)
                .then ((result) => {
                    if (!result) {
                        return reject (
                            new UserDoesNotExist (code)
                        );
                    }
                    resolve (result);
                })
                .catch (err => reject (err));
        });
    }
}

module.exports = {
    FetchOneUser,
    FetchAllUser,
    CreateUser,
    UpdateUser,
    RemoveUser
}