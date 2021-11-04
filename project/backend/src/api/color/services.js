const { ColorAlreadyExists, 
        ColorDoesNotExist } = require ('./errors.js');
const { buildClass } = require ('./model.js');


const create = (repo, request) => {
    return new Promise (async (resolve, reject) => {
        const { name, hexvalue } = request;

        let exists = await repo.exists (name, hexvalue);
        if (exists) {
            return reject (
                new ColorAlreadyExists (name, hexvalue)
            );
        }

        let color = buildClass (name, hexvalue);
        const result = await repo.add (color);
        resolve (result);
    });
};

const fetchAll = (repo) => {
    return new Promise ((resolve, reject) => {
        repo.getAll ()
            .then ((result) => resolve (result))
            .catch (err => reject (err));
    });
}

const update = (repo, request) => {
    return new Promise (async (resolve, reject) => {
        const { code, name, hexvalue } = request;

        const color = await repo.getOne (code);
        if (!color) {
            return reject (
                new ColorDoesNotExist (code)
            );
        }
        
        let existsName = false;
        if (color.name !== name && 
            (existsName = await repo.existsByName (name))) {
            return reject (
                new ColorAlreadyExists (name, hexvalue)
            );
        }

        let existHexValue = false;
        if (color.hex !== hexvalue && 
            (existHexValue = await repo.existsByHex (hexvalue))) {
            return reject (
                new ColorAlreadyExists (name, hexvalue)
            );
        }

        color.update (name, hexvalue);
        const result = await repo.update (color);
        resolve (result);
    });
};

const fetchOne = (repo, request) => {
    return new Promise ((resolve, reject) => {
        const { code } = request;
        repo.getOne (code)
            .then ((result) => {
                if (result === null) {
                    return reject (
                        new ColorDoesNotExist (code)
                    );
                }
                resolve (result);
            })
            .catch (err => reject (err));
    });
}

const remove = (repo, request) => {
    return new Promise ((resolve, reject) => {
        const { code } = request;
        repo.delete (code)
            .then ((result) => {
                if (!result) {
                    return reject (
                        new ColorDoesNotExist (code)
                    );
                }
                resolve (result);
            })
            .catch (err => reject (err));
    });
}

module.exports = {
    create,
    fetchAll,
    fetchOne,
    remove,
    update
}