
class Category {
    constructor (code, name, description) {
        this.code = code;
        this.name = name;
        this.description = description;
    }

    toObject () {
        return {
            code: this.code,
            name: this.name,
            description: this.description
        };
    }
}

const fromSQLToCategory = (row) => {
    return new Category (
        row.category_code,
        row.category_name,
        row.category_description
    );
}

class User {
    constructor (code, firstName, lastName, email) {
        this.code = code;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    toObject () {
        return {
            code: this.code,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email
        };
    }
}

const fromSQLToUser = (row) => {
    return new User (
        row.user_code,
        row.user_fname,
        row.user_lname,
        row.user_email
    );
};

class Product {
    constructor (
        code,
        created,
        updated,
        published,
        publish,
        sku,
        title,
        slug,
        description,
        image,
        price,
        stock,
        rating,
        categoryInstance,
        userInstance
    ) {

        this.code = code;
        this.createdAt = created;
        this.updatedAt = updated;
        this.publishedAt = published;
        this.publish = publish;
        this.sku = sku;
        this.title = title;
        this.slug = slug;
        this.description = description;
        this.image = image;
        this.price = price;
        this.stock = stock;
        this.rating = rating;
        this.category = categoryInstance;
        this.owner = userInstance;
    }

    publish () {
        this.publishedAt = new Date (Date.now ());
        this.publish = true;
    }

    toObject () {
        return {
            code: this.code,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            publishedAt: this.publishedAt,
            publish: this.publish,
            sku: this.sku,
            title: this.title,
            slug: this.slug,
            description: this.description,
            image: this.image,
            price: this.price,
            stock: this.stock,
            rating: this.rating,
            category: this.category.toObject (),
            owner: this.owner.toObject ()
        };
    }
}

const buildClass = (
    sku,
    title,
    slug,
    description,
    image,
    price,
    stock,
    categoryInstance,
    userInstance
    ) => {
    return new Product (
        undefined,
        new Date (Date.now ()),
        null,
        null,
        false,
        sku,
        title,
        slug,
        description,
        image,
        price,
        stock,
        0.00,
        categoryInstance,
        userInstance
    );
}

const fromSQLToProduct = (row) => {
    // console.log (row);
    const categoryInstance = fromSQLToCategory (row);
    const userInstance = fromSQLToUser (row);
    return new Product (
        row.product_code,
        row.product_created,
        row.product_updated,
        row.product_published,
        row.product_publish ? true : false,
        row.product_sku,
        row.product_title,
        row.product_slug,
        row.product_description,
        row.product_image,
        row.product_price,
        row.product_stock,
        row.product_rating,
        categoryInstance,
        userInstance
    );
}

module.exports = {
    Category,
    fromSQLToCategory,
    User,
    fromSQLToUser,
    Product,
    buildClass,
    fromSQLToProduct
};