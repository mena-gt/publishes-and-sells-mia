const { 
    CategoryDoesNotExist,
    ProductAlreadyExists,
    ProductDoesNotExist
} = require ('../../../src/api/product/errors.js');


const successfulFetch = [
    {
        request: {
            id: "Fetch a product already exists",
            code: 1
        }, 
        expected: {
            code: 1,
            createdAt: "2021-10-15 00:00:00",
            updatedAt: null,
            publishedAt: "2021-10-15 00:00:00",
            publish: true,
            sku: 'SKU1',
            title: 'First Product',
            slug: 'first-product',
            description: 'xxxxxxxxxxxxxxxxxxxxxxx',
            image: 'xxxxxxx/xxxxxx/xxxxx1.png',
            price: 14.75,
            stock: 18,
            rating: 2.9,
            category: {
                code: 4,
                name: 'Ropa para Caballeros',
                description: 'Seccion de ropa para hombres.'
            },
            owner: {
                code: 5,
                firstName: 'Firstname Client1',
                lastName: 'Lastname Client1',
                email: 'client1@none.com'
            }
        }
    },
];

const failedFetch = [
    {
        request: {
            id: "Fetch a product does not exist",
            code: 15
        }, 
        expected: new ProductDoesNotExist ("15")
    },
];

const successfulRecovery = [
    {
        request: {
            id: "Fetch all products of first client",
            user: 5
        }, 
        expected: [
            { 
                code: 1,
                createdAt: "2021-10-15 00:00:00",
                updatedAt: null,
                publishedAt: "2021-10-15 00:00:00",
                publish: true,
                sku: 'SKU1',
                title: 'First Product',
                slug: 'first-product',
                description: 'xxxxxxxxxxxxxxxxxxxxxxx',
                image: 'xxxxxxx/xxxxxx/xxxxx1.png',
                price: 14.75,
                stock: 18,
                rating: 2.9,
                category: {
                    code: 4,
                    name: 'Cat1'
                },
                owner: {
                    code: 5,
                    firstName: 'Firstname Client1',
                    lastName: 'Lastname Client1'
                }
            },
            {
                code: 2,
                createdAt: null,
                updatedAt: null,
                publishedAt: null,
                publish: false,
                sku: 'SKU2',
                title: 'Second Product',
                slug: 'second-product',
                description: 'xxxxxxxxxxxxxxxxxxxxxxx',
                image: 'xxxxxxx/xxxxxx/xxxxx2.png',
                price: 12.80,
                stock: 36,
                rating: 3.8,
                category: {
                    code: 5,
                    name: 'Ropa para Niños',
                    description: 'Seccion de ropa para hombres niños.'
                },
                owner: {
                    code: 5,
                    firstName: 'Firstname Client1',
                    lastName: 'Lastname Client1'
                }
            }
        ]
    },
    {
        request: {
            id: "Fetch all products of second client",
            user: 6
        }, 
        expected: [
            { 
                code: 3,
                createdAt: "2021-10-10 00:00:00",
                updatedAt: "2021-10-15 00:00:00",
                publishedAt: "2021-10-15 00:00:00",
                publish: true,
                sku: 'SKU3',
                title: 'Third Product',
                slug: 'third-product',
                description: 'xxxxxxxxxxxxxxxxxxxxxxx',
                image: 'xxxxxxx/xxxxxx/xxxxx3.png',
                price: 2.99,
                stock: 90,
                rating: 4.0,
                category: {
                    code: 6,
                    name: 'Ropa para Jovenes',
                    description: 'Seccion de ropa para hombres jovenes.'
                },
                owner: {
                    code: 6,
                    firstName: 'Firstname Client2',
                    lastName: 'Lastname Client2'
                }
            }
        ]
    }
];

const successfulCreation = [
    {
        request: {
            id: "Create new product for client1 without publish",
            user: 5,
            publish: false,
            sku: 'SKU4',
            title: 'Fourth Product',
            description: 'xxxxxxxxxxxxxxxxxxxxxxx',
            image: 'xxxxxxx/xxxxxx/xxxxx4.png',
            price: 60.40,
            stock: 100,
            category: 5
        }, 
        expected: {
            code: 4,
            createdAt: null,
            updatedAt: null,
            publishedAt: null,
            publish: false,
            sku: 'SKU4',
            title: 'Fourth Product',
            slug: '-Fourth Product-',
            description: 'xxxxxxxxxxxxxxxxxxxxxxx',
            image: 'xxxxxxx/xxxxxx/xxxxx4.png',
            price: 60.40,
            stock: 100,
            rating: 0.0,
            category: {
                code: 5,
                name: 'Ropa para Niños',
                description: 'Seccion de ropa para hombres niños.'
            },
            owner: {
                code: 5,
                firstName: 'Firstname Client1',
                lastName: 'Lastname Client1',
                email: 'client1@none.com'
            }
        }
    }
];

const failedCreation = [
    {
        request: {
            id: "Product's category does not exist",
            name: "Cat1", 
            user: 1,
            publish: false,
            sku: 'SKU4',
            title: 'Fourth Product',
            description: 'xxxxxxxxxxxxxxxxxxxxxxx',
            image: 'xxxxxxx/xxxxxx/xxxxx4.png',
            price: 60.40,
            stock: 100,
            category: 9
        }, 
        expected: new CategoryDoesNotExist ("9")
    }
];

const successfulUpdate = [
    {
        request: {
            id: "Update category adding a parent",
        }, 
        expected: {
            code: 2,
            name: "Cat2.1",
            description: "AUpdatedDescriptionOfACat2",
            parent: 1
        }
    }
];

const failedUpdate = [
    {
        request: {
            id: "Update category with a name already exists",
            code: 2,
            name: "Cat1", 
            description: "AUpdatedDescriptionOfACat2",
            parent: "1"
        },
        expected: new ProductAlreadyExists ("Cat1")
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
        expected: new ProductDoesNotExist ("15")
    }
];

module.exports = {
    successfulUpdate,
    successfulFetch,
    successfulDelete,
    failedUpdate,
    failedFetch,
    failedDelete,
    successfulRecovery,
    successfulCreation,
    failedCreation
}