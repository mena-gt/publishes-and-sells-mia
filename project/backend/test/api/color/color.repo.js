const { db } = require ('../../db.config');

const { ColorRepo } = require ('../../../src/api/color/repository.js');
const { fromSQLToColor  } = require ('../../../src/api/color/model.js');


class ColorKnexRepo extends ColorRepo {
    constructor (q = db) {
        super ();
        this.q = q;
    }

    exists (byName, byHexValue) {
        return new Promise ((resolve, reject) => {
            this.q ('color')
                .select ('color_code')
                .where ({ color_name: byName })
                .orWhere ({ color_hex: byHexValue })
                .limit (1)
                .then ((rows) => resolve (0 < rows.length))
                .catch ((err) => reject (err));
        });
    }

    async add (colorInstance) {
        await this.q ('color')
            .insert ({
                color_name: colorInstance.name,
                color_hex: colorInstance.hex,
            });
        return this.getOneByHex (colorInstance.hex);
    }

    getOneByHex (value) {
        return new Promise ((resolve, reject) => {
            this.q ('color')
                .select ('*')
                .where ({ color_hex: value })
                .limit (1)
                .then ((rows) => {
                    if (0 < rows.length) {
                        resolve (fromSQLToColor (rows[0]));
                    } else {
                        resolve (null);
                    }
                })
                .catch ((err) => reject (err));
        });
    }

    getAll () {
        return new Promise ((resolve, reject) => {
            this.q ('color')
                .select ('*')
                .then ((rows) => {
                    const colors = rows.map ((row) =>
                        fromSQLToColor (row)
                    )
                    resolve (colors);
                })
                .catch (err => reject (err));
        });
    }

    existsByName (value) {
        return new Promise ((resolve, reject) => {
            this.q ('color')
                .select ('color_code')
                .where ({ color_name: value })
                .limit (1)
                .then ((rows) => resolve (0 < rows.length))
                .catch ((err) => reject (err));
        });
    }

    existsByHex (value) {
        return new Promise ((resolve, reject) => {
            this.q ('color')
                .select ('color_code')
                .where ({ color_hex: value })
                .limit (1)
                .then ((rows) => resolve (0 < rows.length))
                .catch ((err) => reject (err));
        });
    }

    getOne (byCodeOrId) {
        return new Promise ((resolve, reject) => {
            this.q ('color')
                .select ('*')
                .where ({ color_code: byCodeOrId })
                .limit (1)
                .then ((rows) => {
                    if (0 < rows.length) {
                        resolve (fromSQLToColor (rows[0]));
                    } else {
                        resolve (null);
                    }
                })
                .catch ((err) => reject (err));
        });
    }

    async update (colorInstance) {
        await this. q ('color')
            .where ('color_code', '=', colorInstance.code)
            .update({
                color_name: colorInstance.name,
                color_hex: colorInstance.hex
            });
        return this.getOne (colorInstance.code);
    }

    delete (byCodeOrId) {
        return new Promise ((resolve, reject) => {
            this.q ('color')
                .where (this.q.raw ('color_code = ?', [byCodeOrId]))
                .del ()
                .then ((result) => resolve (0 < result))
                .catch ((err) => reject (err));
        });
    }
}

module.exports = ColorKnexRepo;