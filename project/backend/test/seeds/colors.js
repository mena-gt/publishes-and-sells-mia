
exports.seed = function (knex) {
    return knex('color').del()
        .then(function () {
            return knex('color').insert([
                { color_code: 1,  color_hex: '#800000', color_name: 'Marron' },
                { color_code: 2,  color_hex: '#ff0000', color_name: 'Red' },
                { color_code: 3,  color_hex: '#ffa500', color_name: 'Orange' },
                { color_code: 4,  color_hex: '#ffff00', color_name: 'Yellow' },
                { color_code: 5,  color_hex: '#808000', color_name: 'Olive' },
                { color_code: 6,  color_hex: '#800080', color_name: 'Purple' },
                { color_code: 7,  color_hex: '#ff00ff', color_name: 'Fuchsia' },
                { color_code: 8,  color_hex: '#ffffff', color_name: 'White' },
                { color_code: 9,  color_hex: '#00ff00', color_name: 'Lime' },
                { color_code: 10, color_hex: '#008000', color_name: 'Green' },
                { color_code: 11, color_hex: '#000080', color_name: 'Navy' },
                { color_code: 12, color_hex: '#0000ff', color_name: 'Blue' },
                { color_code: 13, color_hex: '#00ffff', color_name: 'Agua' },
                { color_code: 14, color_hex: '#008080', color_name: 'Teal' },
                { color_code: 15, color_hex: '#000000', color_name: 'Black' },
                { color_code: 16, color_hex: '#c0c0c0', color_name: 'Silver' },
                { color_code: 17, color_hex: '#8080',   color_name: 'Gray' }
            ]);
        });
};
