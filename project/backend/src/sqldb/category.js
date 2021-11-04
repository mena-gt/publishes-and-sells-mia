const query = require ('./mariadb.js');

const { CategoryRepo } = require ('../api/category/repository.js');
const { fromSQLToCategory } = require ('../api/category/model.js');


const sqls = {
    existsName: 
        `SELECT category_code FROM category WHERE category_name = (?);`,
    existsParent:
        `SELECT category_code FROM category WHERE category_code = (?);`,
    selectAll:
        `SELECT * FROM category;`,
    insertOne:
        `INSERT INTO category 
            (category_name, category_description, category_parent) 
        VALUES 
            (?, ?, ?)`,
    selectOne:
        `SELECT * FROM category WHERE category_code = ? LIMIT 1;`,
    deleteOne:
        `DELETE FROM category WHERE category_code = ?;`,
    updateOne:
        `UPDATE category
            SET
                category_name = ?,
                category_description = ?,
                category_parent = ?
            WHERE
                category_code = ?;`
};

class CategorySQLDBRepo extends CategoryRepo {
    constructor (q = query) {
        super ();
        this.q = q;
    }

    exists (byName) {
        return this.q.exists (sqls['existsName'], [byName]);
    }

    existsParent (byCodeOrId) {
        return this.q.exists (sqls['existsParent'], [byCodeOrId]);
    }

    getAll () {
        return new Promise ((resolve, reject) => {
            this.q.select (sqls['selectAll'], [])
                .then ((result) => {
                    const categories = result.map ((row) => {
                        return fromSQLToCategory (row);
                    })
                    resolve (categories);
                })
                .catch (err => reject (err));
        });
    }

    add (categoryInstance) {
        const data = [
            categoryInstance.name,
            categoryInstance.description,
            categoryInstance.parent
        ];
        return new Promise ((resolve, reject) => {
            this.q.iud (sqls['insertOne'], data)
                .then (result => {
                    if (result.insertId > 0) {
                        return this.getOne (result.insertId)
                    } else { reject (result); }
                })
                .then ((result) => resolve (result))
                .catch (err => reject (err));
        });
    }

    update (categoryInstance) {
        const data = [
            categoryInstance.name,
            categoryInstance.description,
            categoryInstance.parent,
            categoryInstance.code
        ];
        return new Promise ((resolve, reject) => {
            this.q.iud (sqls['updateOne'], data)
                .then (result => resolve (result))
                .catch (err => reject (err));
        });
    }

    getOne (byCodeOrId) {
        return new Promise ((resolve, reject) => {
            this.q.select (sqls['selectOne'], [byCodeOrId])
                .then ((rows) => {
                    if (0 < rows.length) {
                        resolve (fromSQLToCategory (rows[0]));
                    } else {
                        resolve (null);
                    }
                })
                .catch (err => reject (err));
        });
    }

    delete (byCodeOrId) {
        return new Promise ((resolve, reject) => {
            this.q.iud (sqls['deleteOne'], [byCodeOrId])
                .then ((result) => resolve (result))
                .catch ((err) => reject (err));
        });
    }
}

module.exports = {
    CategorySQLDBRepo
}