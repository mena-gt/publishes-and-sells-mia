const { db } = require ('../../db.config');

const { CategoryRepo } = require ('../../../src/api/category/repository.js');
const { fromSQLToCategory  } = require ('../../../src/api/category/model.js');

class CategoryKnexRepo extends CategoryRepo {
    constructor (q = db) {
        super ();
        this.q = q;
    }

    exists (byName) {
        return new Promise ((resolve, reject) => {
            this.q ('category')
                .select ('category_code')
                .where ({ category_name: byName })
                .limit (1)
                .then ((rows) => resolve (0 < rows.length))
                .catch ((err) => reject (err));
        });
    }

    existsParent (byCodeOrId) {
        return new Promise ((resolve, reject) => {
            this.q ('category')
                .select ('category_code')
                .where ({ category_code: byCodeOrId })
                .limit (1)
                .then ((rows) => resolve (0 < rows.length))
                .catch ((err) => reject (err));
        });
    }

    getAll () {
        return new Promise ((resolve, reject) => {
            this.q ('category')
                .select ('*')
                .then ((rows) => {
                    const categories = rows.map ((row) =>
                        fromSQLToCategory (row)
                    )
                    resolve (categories);
                })
                .catch (err => reject (err));
        });
    }

    async add (categoryInstance) {
        await this.q ('category')
            .insert ({
                category_name: categoryInstance.name,
                category_description: categoryInstance.description,
                category_parent: categoryInstance.parent
            });
        return this.getOneByName (categoryInstance.name);
    }

    async update (categoryInstance) {
        await this. q ('category')
            .where ('category_code', '=', categoryInstance.code)
            .update({
                category_name: categoryInstance.name,
                category_description: categoryInstance.description,
                category_parent: categoryInstance.parent
            });
        return this.getOne (categoryInstance.code);
    }

    getOne (byCodeOrId) {
        return new Promise ((resolve, reject) => {
            this.q ('category')
                .select ('*')
                .where ({ category_code: byCodeOrId })
                .limit (1)
                .then ((rows) => {
                    if (0 < rows.length) {
                        resolve (fromSQLToCategory (rows[0]));
                    } else {
                        resolve (null);
                    }
                })
                .catch ((err) => reject (err));
        });
    }

    getOneByName (name) {
        return new Promise ((resolve, reject) => {
            this.q ('category')
                .select ('*')
                .where ({ category_name: name })
                .limit (1)
                .then ((rows) => {
                    if (0 < rows.length) {
                        resolve (fromSQLToCategory (rows[0]));
                    } else {
                        resolve (null);
                    }
                })
                .catch ((err) => reject (err));
        });
    }

    delete (byCodeOrId) {
        return new Promise ((resolve, reject) => {
            this.q ('category')
                .where (this.q.raw ('category_code = ?', [byCodeOrId]))
                .del ()
                .then ((result) => resolve (0 < result))
                .catch ((err) => reject (err));
        });
    }
}


module.exports = CategoryKnexRepo;