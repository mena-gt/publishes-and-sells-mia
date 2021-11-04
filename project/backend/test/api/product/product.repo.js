const { db } = require ('../../db.config');

const { ProductRepository, 
        CategoryRepository, 
        UserRepository } = require ('../../../src/api/product/repository.js');
const { fromSQLToProduct,
        fromSQLToCategory,
        fromSQLToUser } = require ('../../../src/api/product/model.js');


class CategoryKnexRepo extends CategoryRepository {
    constructor (q = db) {
        super ();
        this.q = q;
    }

    exists (byCodeOrId) {
        return new Promise ((resolve, reject) => {
            this.q ('category')
                .select ('category_code')
                .where ({ category_code: byCodeOrId })
                .limit (1)
                .then ((rows) => resolve (0 < rows.length))
                .catch ((err) => reject (err));
        });
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

}

class UserKnexRepo extends UserRepository {
    constructor (q = db) {
        super ();
        this.q = q;
    }

    getOne (byCodeOrId) {
        return new Promise ((resolve, reject) => {
            this.q ('user')
                .select (
                    'user_code',
                    'user_created',
                    'user_updated',
                    'user_lastlogin',
                    'user_fname',
                    'user_lname',
                    'user_gender',
                    'user_birthdate',
                    'user_phonenum',
                    'user_email'
                )
                .where ({ user_code: byCodeOrId })
                .limit (1)
                .then ((rows) => {
                    if (0 < rows.length) {
                        resolve (fromSQLToUser (rows[0]));
                    } else {
                        resolve (null);
                    }
                })
                .catch ((err) => reject (err));
        });        
    }

    exists (byCode) {
        return new Promise ((resolve, reject) => {
            this.q ('user')
                .select ('user_code')
                .where ({ user_code: byCode })
                .limit (1)
                .then ((rows) => resolve (0 < rows.length))
                .catch ((err) => reject (err));
        });
    }
}

class ProductKnexRepo extends ProductRepository {
    constructor (q = db) {
        super ();
        this.q = q;
    }

    exists (byCode) {
        return new Promise ((resolve, reject) => {
            this.q ('product')
                .select ('product_code')
                .where ({ product_code: byCode })
                .limit (1)
                .then ((rows) => resolve (0 < rows.length))
                .catch ((err) => reject (err));
        });
    }

    getOneBySlug (value) {
        return new Promise ((resolve, reject) => {
            this.q ('product')
                .join ('category', 'product_category', '=', 'category_code')
                .join ('user', 'product_owner', '=', 'user_code')
                .select (
                    'product_code',
                    'product_created',
                    'product_updated',
                    'product_published',
                    'product_publish',
                    'product_sku',
                    'product_title',
                    'product_slug',
                    'product_description',
                    'product_image',
                    'product_price',
                    'product_stock',
                    'product_rating',
                    'category_code',
                    'category_name',
                    'category_description',
                    'user_code',
                    'user_fname',
                    'user_lname',
                    'user_email'
                )
                .where ({ product_slug: value })
                .limit (1)
                .then ((rows) => {
                    if (0 < rows.length) {
                        resolve (fromSQLToProduct (rows[0]));
                    } else {
                        resolve (null);
                    }
                })
                .catch ((err) => reject (err));
        });
    }

    getOne (byCodeOrId) {
        return new Promise ((resolve, reject) => {
            this.q ('product')
                .join ('category', 'product_category', '=', 'category_code')
                .join ('user', 'product_owner', '=', 'user_code')
                .select (
                    'product_code',
                    'product_created',
                    'product_updated',
                    'product_published',
                    'product_publish',
                    'product_sku',
                    'product_title',
                    'product_slug',
                    'product_description',
                    'product_image',
                    'product_price',
                    'product_stock',
                    'product_rating',
                    'category_code',
                    'category_name',
                    'category_description',
                    'user_code',
                    'user_fname',
                    'user_lname',
                    'user_email'
                )
                .where ({ product_code: byCodeOrId })
                .limit (1)
                .then ((rows) => {
                    if (0 < rows.length) {
                        resolve (fromSQLToProduct (rows[0]));
                    } else {
                        resolve (null);
                    }
                })
                .catch ((err) => reject (err));
        });
    }

    getAll () {
        return new Promise ((resolve, reject) => {
            this.q ('product')
                .join ('category', 'product_category', '=', 'category_code')
                .join ('user', 'product_owner', '=', 'user_code')
                .select (
                    'product_code',
                    'product_created',
                    'product_updated',
                    'product_published',
                    'product_publish',
                    'product_sku',
                    'product_title',
                    'product_slug',
                    'product_description',
                    'product_image',
                    'product_price',
                    'product_stock',
                    'product_rating',
                    'category_code',
                    'category_name',
                    'category_description',
                    'user_code',
                    'user_fname',
                    'user_lname',
                    'user_email'
                )
                .then ((rows) => {
                    const categories = rows.map ((row) =>
                        fromSQLToProduct (row)
                    )
                    resolve (categories);
                })
                .catch (err => reject (err));
        });
    }

    async add (productInstance) {
        await this.q ('product')
            .insert ({
                product_code: productInstance.code,
                product_created: productInstance.createdAt,
                product_updated: productInstance.updatedAt,
                product_published: productInstance.publishedAt,
                product_publish: productInstance.publish,
                product_sku: productInstance.sku,
                product_title: productInstance.title,
                product_slug: productInstance.slug,
                product_description: productInstance.description,
                product_image: productInstance.image,
                product_price: productInstance.price,
                product_stock: productInstance.stock,
                product_rating: 0.0,
                product_category: productInstance.category.code,
                product_owner: productInstance.owner.code
            });
        return this.getOneBySlug (productInstance.slug);
    }

    myProducts (userByCodeOrId) {
        return new Promise ((resolve, reject) => {
            this.q ('product')
                .join ('category', 'product_category', '=', 'category_code')
                .join ('user', 'product_owner', '=', userByCodeOrId)
                .select (
                    'product_code',
                    'product_created',
                    'product_updated',
                    'product_published',
                    'product_publish',
                    'product_sku',
                    'product_title',
                    'product_slug',
                    'product_description',
                    'product_image',
                    'product_price',
                    'product_stock',
                    'product_rating',
                    'category_code',
                    'category_name',
                    'category_description',
                    'user_code',
                    'user_fname',
                    'user_lname',
                    'user_email'
                )
                .then ((rows) => {
                    const categories = rows.map ((row) =>
                        fromSQLToProduct (row)
                    )
                    resolve (categories);
                })
                .catch (err => reject (err));
        });
    }
}

module.exports = {
    CategoryKnexRepo,
    UserKnexRepo,
    ProductKnexRepo
}