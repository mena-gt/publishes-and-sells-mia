const { UserAlreadyExists, 
        UserDoesNotExist } = require ('./errors.js');


const fetchOne = (repo, request) => {
    return new Promise ((resolve, reject) => {
        const { code } = request;
        repo.getOne (code)
            .then ((result) => {
                if (result === null) {
                    return reject (
                        new UserDoesNotExist (code)
                    );
                }
                resolve (result);
            })
            .catch (err => reject (err));
    });
}

const update = (repo, request) => {
    return new Promise (async (resolve, reject) => {
        const { 
            code, 
            firstname, 
            lastname, 
            gender, 
            birthdate, 
            phonenumber, 
            image } = request;

        const user = await repo.getOne (code);
        if (!user) {
            return reject (
                new UserDoesNotExist (code)
            );
        }

        user.update (
            firstname,
            lastname,
            gender,
            phonenumber,
            image,
            birthdate
        );

        const result = await repo.update (user);
        resolve (result);
    });
};

const remove = (repo, request) => {
    return new Promise ((resolve, reject) => {
        const { code } = request;
        repo.delete (code)
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

module.exports = {
    fetchOne,
    remove,
    update
}