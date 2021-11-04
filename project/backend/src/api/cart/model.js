
class Product {
    constructor (
        code,
        title,
        slug,
        image,
        price,
        stock
    ) {
        this.code = code;
        this.title = title;
        this.slug = slug;
        this.image = image;
        this.price = price;
        this.stock = stock;
    }
}

class ItemCart {
    constructor (
        cartCode, 
        productCode,
        productInstance,
        quantity,
        subtotal) {
        
        this.cartCode = cartCode;
        this.productCode = productCode;
        this.product = productInstance;
        this.quantity = quantity;
        this.subtotal = subtotal;
    }
}

class Cart {
    constructor (
        code,
        userInstance,
        itemsInstance,
        total
    ) {
        this.code = code;
        this.user = userInstance;
        this.items = itemsInstance;
        this.total = total;
    }
}


const buildClass = (name, description, parent) => {
    return new Cart (
        undefined, 
        name, 
        description, 
        parent === undefined ? null : parent
    )
}

const fromSQLToCartItem = (row) => {
    return null;
}

const fromSQLToCart = (result) => {
    return new Cart (
        result.category_code,
        result.category_name,
        result.category_description,
        result.category_parent
    )
}

module.exports = {
    Cart,
    buildClass,
    fromSQLToCart
};