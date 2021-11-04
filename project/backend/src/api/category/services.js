const { CategoryAlreadyExists, 
        CategoryDoesNotExist, 
        ParentCategoryDoesNotExist } = require ('./errors.js');
const { buildClass } = require ('./model.js');


const create = (repo, request) => {
    return new Promise (async (resolve, reject) => {
        const { name, description, parent} = request;
        
        let existsName = await repo.exists (name);
        if (existsName) {
            return reject (
                new CategoryAlreadyExists (name)
            );
        }

        let existsParent = false;
        if (parent !== undefined &&
            !(existsParent = await repo.existsParent (parent))) {
            return reject (
                new ParentCategoryDoesNotExist (parent)
            );
        }

        let category = buildClass (name, description, parent);
        const result = await repo.add (category);

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
        const { code, name, description, parent } = request;
        
        const category = await repo.getOne (code);
        if (!category) {
            return reject (
                new CategoryDoesNotExist (code)
            );
        }
        
        let existsCategoryName = false;
        if (category.name !== name &&
           (existsCategoryName = await repo.exists (name))) {
            return reject (
                new CategoryAlreadyExists (name)
            );
        }

        let existsParent = false;
        if (parent !== undefined && 
            category.parent !== parent &&
            !(existsParent = await repo.existsParent (parent))) {
            return reject (
                new ParentCategoryDoesNotExist (parent)
            );
        }

        category.update (name, description, parent);
        const result = await repo.update (category);
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
                        new CategoryDoesNotExist (code)
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
                        new CategoryDoesNotExist (code)
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