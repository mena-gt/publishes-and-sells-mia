const query = require ('./mariadb.js');

const { ColorRepo } = require ('../api/color/repository.js');
const { fromSQLToColor } = require ('../api/color/model.js');


const sqls = {
    existsColor: 
        `SELECT color_code FROM color WHERE color_name = ? OR color_hex  = ?;`,
    selectAll:
        `SELECT * FROM color;`,
    insertOne:
        `INSERT INTO color 
            (color_name, color_hex) 
        VALUES 
            (?, ?, ?)`,
    selectOne:
        `SELECT * FROM color WHERE color_code = ? LIMIT 1;`,
    deleteOne:
        `DELETE FROM color WHERE color_code = ?;`,
    updateOne:
        `UPDATE color
            SET
                color_name = ?,
                color_hex = ?
            WHERE
                color_code = ?;`
}

class ColorSQLDBRepo extends ColorRepo {
    constructor (q = query) {
        super ();
        this.q = q;
    }

    exists (byName, byHex) {
        return this.q.exists (sqls['existsColor'], [byName, byHex]);
    }

    getAll () {
        return new Promise ((resolve, reject) => {
            this.q.select (sqls['selectAll'], [])
                .then ((result) => {
                    const colors = result.map ((row) => {
                        return fromSQLToColor (row);
                    })
                    resolve (colors);
                })
                .catch (err => reject (err));
        });
    }

    add (colorInstance) {
        const data = [
            colorInstance.name,
            colorInstance.hex,
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

    update (colorInstance) {
        const data = [
            colorInstance.name,
            colorInstance.hex,
            colorInstance.code
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
                .then ((result) => {
                    if (result.length > 0) {
                        resolve (fromSQLToColor (result[0]));
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
    ColorSQLDBRepo
}