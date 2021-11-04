
class Category {
    constructor (code, name, description, parent) {
        this.code = code;
        this.name = name;
        this.description = description;
        this.parent = parent;
    }

    update (name, description, parent) {
        this.name = name;
        this.description = description;
        this.parent = parent === undefined ? null : parent;
    }

    toObject () {
        return {
            code: this.code,
            name: this.name,
            description: this.description,
            parent: this.parent
        }
    }
}

const buildClass = (name, description, parent) => {
    return new Category (
        undefined, 
        name, 
        description, 
        parent === undefined ? null : parent
    );
}

const fromSQLToCategory = (row) => {
    return new Category (
        row.category_code,
        row.category_name,
        row.category_description,
        row.category_parent
    );
}

module.exports = {
    Category,
    buildClass,
    fromSQLToCategory
};