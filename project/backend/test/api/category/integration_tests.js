const assert = require ('assert');

const CategoryKnexRepo = require ('./category.repo.js');
const { db, createTables, dropTables } = require ('../../db.config');
const service = require ('../../../src/api/category/services.js');
const data = require ('./data.js');


const loadDataToDB = function () {
    return new Promise (async (resolve) => {
        await db.seed.run ('categories.js');
        resolve ();
    });
};


describe ('Integration tests: Category Api', function () {
    
    beforeEach (function () {
        return createTables ('20211013161044_category.js');
    });
    afterEach (dropTables);

    describe ('Service: create', function () {
        
        beforeEach (loadDataToDB);

        describe ('Successful requests', function () {
            data.successfulCreation.forEach (({ request, expected }) => {
                it (`${request.id}`, async function () {
                    // Arrange
                    const repo = new CategoryKnexRepo ();
                    const { id, ...input } = request;

                    // sut.action ()
                    const category = await service.create (repo, input);

                    // Assert
                    assert.deepEqual (category.toObject (), expected);
                });
            });
        });

        describe ('Failed requests', function () {
            data.failedCreation.forEach (({ request, expected }) => {
                it (`${request.id}`, async function () {
                    // Arrange
                    const repo = new CategoryKnexRepo ();
                    const { id, ...input } = request;

                    // Act
                    const sut_action = async () => {
                        await service.create (repo, input);
                    }

                    // Assert
                    assert.rejects (sut_action, expected)
                });
            });
        });

    });

    describe ('Service: fetchAll', function () {

        describe ('Successful requests', function () {
            it (`Category without registers`, async function () {
                // Arrange
                const repo = new CategoryKnexRepo ();
                //const { id, ...input } = request;

                // sut.action ()
                const categories = await service.fetchAll (repo);

                // Assert
                assert.deepEqual (categories, []);
            });
        });

        describe ('Successful requests', function () {

            beforeEach (loadDataToDB);

            data.successfulRecovery.forEach (({ request, expected }) => {
                it (`${request.id}`, async function () {
                    // Arrange
                    const repo = new CategoryKnexRepo ();
                    // const { id, ...input } = request;

                    // sut.action ()
                    const categories = await service.fetchAll (repo);

                    // Assert
                    assert.deepEqual (categories, expected);
                });
            });
        });
    });

    describe ('Service: update', function () {

        beforeEach (loadDataToDB);

        describe ('Successful requests', function () {
            data.successfulUpdate.forEach (({ request, expected }) => {
                it (`${request.id}`, async function () {
                    // Arrange
                    const repo = new CategoryKnexRepo ();
                    const { id, ...input } = request;

                    // sut.action ()
                    const category = await service.update (repo, input);

                    // Assert
                    assert.deepEqual (category.toObject (), expected);
                });
            });
        });

        describe ('Failed requests', function () {
            data.failedUpdate.forEach (({ request, expected }) => {
                it (`${request.id}`, async function () {
                    // Arrange
                    const repo = new CategoryKnexRepo ();
                    const { id, ...input } = request;

                    // Act
                    const sut_action = async () => {
                        await service.update (repo, input);
                    }

                    // Assert
                    assert.rejects (sut_action, expected)
                });
            });
        });

    });

    describe ('Service: fetchOne', function () {

        beforeEach (loadDataToDB);

        describe ('Successful requests', function () {
            data.successfulFetch.forEach (({ request, expected }) => {
                it (`${request.id}`, async function () {
                    // Arrange
                    const repo = new CategoryKnexRepo ();
                    const { id, ...input } = request;

                    // sut.action ()
                    const category = await service.fetchOne (repo, input);

                    // Assert
                    assert.deepEqual (category.toObject (), expected);
                });
            });
        });

        describe ('Failed requests', function () {
            data.failedFetch.forEach (({ request, expected }) => {
                it (`${request.id}`, async function () {
                    // Arrange
                    const repo = new CategoryKnexRepo ();
                    const { id, ...input } = request;

                    // Act
                    const sut_action = async () => {
                        await service.fetchOne (repo, input);
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
                it (`${request.id}`, async function () {
                    // Arrange
                    const repo = new CategoryKnexRepo ();
                    const { id, ...input } = request;

                    // sut.action ()
                    const result = await service.remove (repo, input);

                    // Assert
                    assert.equal (result, expected);
                });
            });
        });

        describe ('Failed requests', function () {
            data.failedDelete.forEach (({ request, expected }) => {
                it (`${request.id}`, async function () {
                    // Arrange
                    const repo = new CategoryKnexRepo ();
                    const { id, ...input } = request;

                    // Act
                    const sut_action = async () => {
                        await service.remove (repo, input);
                    }

                    // Assert
                    assert.rejects (sut_action, expected)
                });
            });
        });
    });
});