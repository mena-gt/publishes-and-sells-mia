
exports.seed = function (knex) {
    return knex ('category').del ()
        .then (function () {
            return knex ('category').insert ([
                { 
                    category_code: 1,
                    category_name: 'Ropa', 
                    category_description: 'Seccion de ropa.', 
                    category_parent: null
                },
                { 
                    category_code: 2,
                    category_name: 'Electrodomesticos', 
                    category_description: 'Seccion de aparatos de electrodomesticos.', 
                    category_parent: null
                },
                { 
                    category_code: 3,
                    category_name: 'Ropa para Damas', 
                    category_description: 'Seccion de ropa para damas.', 
                    category_parent: 1
                },
                { 
                    category_code: 4,
                    category_name: 'Ropa para Caballeros', 
                    category_description: 'Seccion de ropa para hombres.', 
                    category_parent: 1
                },
                { 
                    category_code: 5,
                    category_name: 'Ropa para Niños', 
                    category_description: 'Seccion de ropa para hombres niños.', 
                    category_parent: 4
                },
                { 
                    category_code: 6,
                    category_name: 'Ropa para Jovenes', 
                    category_description: 'Seccion de ropa para hombres jovenes.', 
                    category_parent: 4
                },
                { 
                    category_code: 7,
                    category_name: 'Ropa para Adultos', 
                    category_description: 'Seccion de ropa para hombres adultos.', 
                    category_parent: 4
                }
            ]);
        });
};