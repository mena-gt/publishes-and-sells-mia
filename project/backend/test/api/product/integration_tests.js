const assert = require ('assert');

const { CategoryKnexRepo, 
        UserKnexRepo, 
        ProductKnexRepo } = require ('./product.repo.js');
const { db, createTables, dropTables } = require ('../../db.config');
const service = require ('../../../src/api/product/services.js');
const data = require ('./data.js');


const loadDataToDB = function () {
    return new Promise (async (resolve) => {
        await db.seed.run ('products.js');
        resolve ();
    });
};


describe ('Integration tests: Product Api', function () {
    
    beforeEach (function () {
        return createTables ('20211013161044_product.js');
    });
    afterEach (dropTables);

    describe ('Service: fetchOne', function () {

        beforeEach (loadDataToDB);

        describe ('Successful requests', function () {
            data.successfulFetch.forEach (({ request, expected }) => {
                it (`${request.id}`, async function () {
                    // Arrange
                    const productRepo = new ProductKnexRepo ();
                    const { id, ...input } = request;
                    const sut = new service.FetchOneProduct (productRepo);

                    // sut.action ()
                    const product = await sut.fetchOne (input);

                    // Assert
                    assert.deepStrictEqual (product.toObject (), expected);
                });
            });
        });

        describe ('Failed requests', function () {
            data.failedFetch.forEach (({ request, expected }) => {
                it (`${request.id}`, async function () {
                    // Arrange
                    const repo = new ProductKnexRepo ();
                    const sut = new service.FetchOneProduct (repo);
                    const { id, ...input } = request;

                    // Act
                    const sut_action = async () => {
                        await sut.fetchOne (input);
                    }

                    // Assert
                    assert.rejects (sut_action, expected)
                });
            });
        });

    });

    describe ('Service: fetchAll', function () {

        describe ('Successful requests', function () {
            it (`Product without registers`, async function () {
                // Arrange
                const repo = new ProductKnexRepo ();
                const sut = new service.FetchAllProduct (repo);

                // sut.action ()
                const products = await sut.fetchAll ();

                // Assert
                assert.deepStrictEqual (products, []);
            });
        });

        describe ('Successful requests', function () {

            beforeEach (loadDataToDB);

            data.successfulRecovery.forEach (({ request, expected }) => {
                it.skip (`${request.id}`, async function () {
                    // Arrange
                    const repo = new ProductKnexRepo ();
                    const sut = new service.FetchAllProduct (repo);
                    const { id, ...input } = request;

                    // sut.action ()
                    const products = await sut.fetchMyProducts (input);

                    // Assert
                    productsObjects = products.map (
                        (product) => product.toObject ()
                    );
                    assert.deepStrictEqual (productsObjects, expected);
                });
            });
        });
    });

    describe ('Service: create', function () {
        
        beforeEach (loadDataToDB);

        describe ('Successful requests', function () {
            data.successfulCreation.forEach (({ request, expected }) => {
                it.skip (`${request.id}`, async function () {
                    // Arrange
                    const productRepo = new ProductKnexRepo ();
                    const userRepo = new UserKnexRepo ();
                    const categoryRepo = new CategoryKnexRepo ();
                    const { id, ...input } = request;
                    const sut = new service.CreateProduct (
                        productRepo,
                        userRepo,
                        categoryRepo
                    );

                    // sut.action ()
                    const product = await sut.create (input);

                    // Assert
                    assert.deepStrictEqual (product.toObject (), expected);
                });
            });
        });

        describe ('Failed requests', function () {
            data.failedCreation.forEach (({ request, expected }) => {
                it.skip (`${request.id}`, async function () {
                    // Arrange
                    const productRepo = new ProductKnexRepo ();
                    const userRepo = new UserKnexRepo ();
                    const categoryRepo = new CategoryKnexRepo ();
                    const { id, ...input } = request;
                    const sut = new service.CreateProduct (
                        productRepo,
                        userRepo,
                        categoryRepo
                    );

                    // Act
                    const sut_action = async () => {
                        await sut.create (input);
                    }

                    // Assert
                    assert.rejects (sut_action, expected)
                });
            });
        });

    });

    describe ('Service: update', function () {

        beforeEach (loadDataToDB);

        describe ('Successful requests', function () {
            data.successfulUpdate.forEach (({ request, expected }) => {
                it.skip (`${request.id}`, async function () {
                    // Arrange
                    const productRepo = new ProductKnexRepo ();
                    const userRepo = new UserKnexRepo ();
                    const categoryRepo = new CategoryKnexRepo ();
                    const { id, ...input } = request;
                    const sut = new service.UpdateProduct (
                        productRepo,
                        userRepo,
                        categoryRepo
                    );

                    // sut.action ()
                    const product = await sut.update (input);

                    // Assert
                    assert.deepStrictEqual (product.toObject (), expected);
                });
            });
        });

        describe ('Failed requests', function () {
            data.failedUpdate.forEach (({ request, expected }) => {
                it.skip (`${request.id}`, async function () {
                    // Arrange
                    const productRepo = new ProductKnexRepo ();
                    const userRepo = new UserKnexRepo ();
                    const categoryRepo = new CategoryKnexRepo ();
                    const { id, ...input } = request;
                    const sut = new service.UpdateProduct (
                        productRepo,
                        userRepo,
                        categoryRepo
                    );

                    // Act
                    const sut_action = async () => {
                        await  sut.update (input);
                    }

                    // Assert
                    assert.rejects (sut_action, expected)
                });
            });
        });

    });

    describe ('Service: remove', function () {

        beforeEach (loadDataToDB);

        describe ('Successful requests', function () {
            data.successfulDelete.forEach (({ request, expected }) => {
                it.skip (`${request.id}`, async function () {
                    // Arrange
                    const productRepo = new ProductKnexRepo ();
                    const { id, ...input } = request;
                    const sut = new service.RemoveProduct (productRepo);

                    // sut.action ()
                    const result = await sut.remove (input);

                    // Assert
                    assert.strictEqual (result, expected);
                });
            });
        });

        describe ('Failed requests', function () {
            data.failedDelete.forEach (({ request, expected }) => {
                it.skip (`${request.id}`, async function () {
                    // Arrange
                    const productRepo = new ProductKnexRepo ();
                    const { id, ...input } = request;
                    const sut = new service.RemoveProduct (productRepo);

                    // Act
                    const sut_action = async () => {
                        await sut.remove (input);
                    }

                    // Assert
                    assert.rejects (sut_action, expected)
                });
            });
        });
    });
});