const { UserAlreadyExists, 
        UserDoesNotExist } = require ('./errors.js');
const { buildClass } = require ('./model.js');


class SignupAuthn {
    constructor (userRepo, roleRepo, typeRepo, statusRepo) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.typeRepo = typeRepo;
        this.statusRepo = statusRepo;
    }

    signup (request) {
        return new Promise (async (resolve, reject) => {
            const { firstname, lastname, email, password, repassw } = request;

            let existsUserEmail = await this.userRepo.exists (email);
            if (existsUserEmail) {
                return reject (
                    new UserAlreadyExists (email)
                );
            }
            
            // const hashedPassword = service.encrypt (password)
            
            const roleInstance = await this.roleRepo.getClientRole ();
            const accountTypes = await this.typeRepo.getAll ();
            const statusInstance = await this.statusRepo.getInactiveStatus ();

            let user = buildClass (
                firstname,
                lastname,
                email,
                password,
                statusInstance,
                roleInstance
            )

            user.setRandomAccounType (accountTypes);

            const result = await this.userRepo.add (user)
            resolve (result);
        });  
    }
}

class SigninAuthn {
    constructor (userRepo, roleRepo, statusRepo) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
        this.statusRepo = statusRepo;
    }

    signin (request) {
        return new Promise (async (resolve, reject) => {
            const { email, password } = request;

            let existsUserEmail = await this.userRepo.exists (email);
            if (!existsUserEmail) {
                return reject (
                    new UserDoesNotExist (email)
                );
            }

            const user = await this.userRepo.getOneByEmail (email);
            // checkpassword 

            // user.initSession ()
            // const result = await repo.update (user)

            resolve (user);
        }); 
    }
}

module.exports = {
    SignupAuthn,
    SigninAuthn
}