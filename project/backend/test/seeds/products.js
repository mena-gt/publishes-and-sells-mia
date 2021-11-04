
exports.seed = async function (knex) {
    await knex ('product').del ()
        .then (function () {
            return knex ('product').insert ([
                {
                    product_code: 1,
                    product_created: "2021-10-15 00:00:00",
                    product_updated: null,
                    product_published: "2021-10-15 00:00:00",
                    product_publish: true,
                    product_sku: 'SKU1',
                    product_title: 'First Product',
                    product_slug: 'first-product',
                    product_description: 'xxxxxxxxxxxxxxxxxxxxxxx',
                    product_image: 'xxxxxxx/xxxxxx/xxxxx1.png',
                    product_price: 14.75,
                    product_stock: 18,
                    product_rating: 2.9,
                    product_category: 4,
                    product_owner: 5,
                },
                {
                    product_code: 2,
                    product_created: "2021-10-15 00:00:00",
                    product_updated: null,
                    product_published: null,
                    product_publish: false,
                    product_sku: 'SKU2',
                    product_title: 'Second Product',
                    product_slug: 'second-product',
                    product_description: 'xxxxxxxxxxxxxxxxxxxxxxx',
                    product_image: 'xxxxxxx/xxxxxx/xxxxx2.png',
                    product_price: 12.80,
                    product_stock: 36,
                    product_rating: 3.8,
                    product_category: 5,
                    product_owner: 5,
                },
                {
                    product_code: 3,
                    product_created: "2021-10-10 00:00:00",
                    product_updated: "2021-10-15 00:00:00",
                    product_published: "2021-10-15 00:00:00",
                    product_publish: true,
                    product_sku: 'SKU3',
                    product_title: 'Third Product',
                    product_slug: 'third-product',
                    product_description: 'xxxxxxxxxxxxxxxxxxxxxxx',
                    product_image: 'xxxxxxx/xxxxxx/xxxxx3.png',
                    product_price: 2.99,
                    product_stock: 90,
                    product_rating: 4.0,
                    product_category: 6,
                    product_owner: 6,
                },                
            ]);
        });

};
