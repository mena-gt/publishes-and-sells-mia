const { 
    CategoryAlreadyExists,
    ParentCategoryDoesNotExist,
    CategoryDoesNotExist
} = require ('../../../src/api/category/errors.js');

const successfulCreation = [
    {
        request: {
            id: "Create new category without parent",
            name: "Cat3", 
            description: "AFlatDescription",
            parent: undefined
        }, 
        expected: {
            code: 8,
            name: 'Cat3',
            description: "AFlatDescription",
            parent: null
        }
    },
    {
        request: {
            id: "Create new category with parent",
            name: "Cat4", 
            description: "ASimpleDescriptionOfCat4", 
            parent: "1"
        }, 
        expected: {
            code: 8,
            name: "Cat4",
            description: "ASimpleDescriptionOfCat4",
            parent: 1
        }
    }
];

const failedCreation = [
    {
        request: {
            id: "Category's name already exists",
            name: "Ropa", 
            description: "AFlatDescription",
            parent: undefined
        }, 
        expected: new CategoryAlreadyExists ("Ropa")
    },
    {
        request: {
            id: "Category's parent does not exist",
            name: "Cat3", 
            description: "AFlatDescription",
            parent: "10"
        }, 
        expected: new ParentCategoryDoesNotExist ("10")
    }
];

const successfulRecovery = [
    {
        request: {
            id: "Category with registers"
        }, 
        expected: [
            { 
                code: 1,
                name: 'Ropa', 
                description: 'Seccion de ropa.', 
                parent: null
            },
            { 
                code: 2,
                name: 'Electrodomesticos', 
                description: 'Seccion de aparatos de electrodomesticos.', 
                parent: null
            },
            { 
                code: 3,
                name: 'Ropa para Damas', 
                description: 'Seccion de ropa para damas.', 
                parent: 1
            },
            { 
                code: 4,
                name: 'Ropa para Caballeros', 
                description: 'Seccion de ropa para hombres.', 
                parent: 1
            },
            { 
                code: 5,
                name: 'Ropa para Niños', 
                description: 'Seccion de ropa para hombres niños.', 
                parent: 4
            },
            { 
                code: 6,
                name: 'Ropa para Jovenes', 
                description: 'Seccion de ropa para hombres jovenes.', 
                parent: 4
            },
            { 
                code: 7,
                name: 'Ropa para Adultos', 
                description: 'Seccion de ropa para hombres adultos.', 
                parent: 4
            }
        ]
    }
];

const successfulUpdate = [
    {
        request: {
            id: "Update category adding a parent",
            code: 2,
            name: "Cat2.1", 
            description: "AUpdatedDescriptionOfACat2",
            parent: "1"
        }, 
        expected: {
            code: 2,
            name: "Cat2.1",
            description: "AUpdatedDescriptionOfACat2",
            parent: 1
        }
    },
    {
        request: {
            id: "Update category removing a parent",
            code: 2,
            name: "Cat2.2", 
            description: "AUpdatedDescriptionOfACat2",
            parent: undefined
        }, 
        expected: {
            code: 2,
            name: "Cat2.2",
            description: "AUpdatedDescriptionOfACat2",
            parent: null
        }
    },
];

const failedUpdate = [
    {
        request: {
            id: "Update category with a name already exists",
            code: 2,
            name: "Ropa", 
            description: "AUpdatedDescriptionOfACat2",
            parent: "1"
        },
        expected: new CategoryAlreadyExists ("Cat1")
    },
    {
        request: {
            id: "Category's parent does not exist",
            code: 2,
            name: "Cat2.2", 
            description: "AUpdatedDescriptionOfACat2",
            parent: "18"
        }, 
        expected: new ParentCategoryDoesNotExist ("10")
    },
    {
        request: {
            id: "The category for update it does not exist",
            code: 99,
            name: "Cat2.2", 
            description: "AUpdatedDescriptionOfACat2",
            parent: "1"
        }, 
        expected: new CategoryDoesNotExist ("99")
    }
];

const successfulFetch = [
    {
        request: {
            id: "Fetch a category already exists",
            code: 1
        }, 
        expected: {
            code: 1,
            name: 'Ropa', 
            description: 'Seccion de ropa.', 
            parent: null
        }
    },
];

const failedFetch = [
    {
        request: {
            id: "Fetch a category does not exist",
            code: 15
        }, 
        expected: new CategoryDoesNotExist ("15")
    },
];

const successfulDelete = [
    {
        request: {
            id: "Delete a category already exists",
            code: 2
        }, 
        expected: true
    }
];

const failedDelete = [
    {
        request: {
            id: "Delete a category does not exist",
            code: 15
        }, 
        expected: new CategoryDoesNotExist ("15")
    }
];

const rawInputData = [
    {
        args: {
            id: "Category without parent", 
            name: "Cat1", 
            description: "AFlatDescription"
        }, 
        expected: undefined
    },
    {
        args: {
            id: "Category with empty parent", 
            name: "Cat2", 
            description: "ASimpleDescription", 
            parent: "10"
        }, 
        expected: undefined
    }
];

module.exports = {
    successfulUpdate,
    successfulFetch,
    successfulDelete,
    failedUpdate,
    failedFetch,
    failedDelete,
    rawInputData,
    successfulRecovery,
    successfulCreation,
    failedCreation
}