const assert = require ('assert');

const { ProfileKnexRepo } = require ('./profile.repo.js');
const { db, createTables, dropTables } = require ('../../db.config');
const service = require ('../../../src/api/profile/services.js');
const data = require ('./data.js');


const loadDataToDB = function () {
    return new Promise (async (resolve) => {
        await db.seed.run ('users.js');
        resolve ();
    });
};


describe ('Integration tests: Profile Api', function () {
    
    beforeEach (function () {
        return createTables ('20211013181725_user.js');
    });
    afterEach (dropTables);

    describe ('Service: fetchOne', function () {

        beforeEach (loadDataToDB);

        describe ('Successful requests', function () {
            data.successfulFetch.forEach (({ request, expected }) => {
                it (`${request.id}`, async function () {
                    // Arrange
                    const repo = new ProfileKnexRepo ();
                    const { id, ...input } = request;

                    // sut.action ()
                    const user = await service.fetchOne (repo, input);

                    // Assert
                    assert.deepEqual (user.toObject (), expected);
                });
            });
        });

        /*describe ('Failed requests', function () {
            data.failedFetch.forEach (({ request, expected }) => {
                it (`${request.id}`, async function () {
                    // Arrange
                    const userRepo = new UserKnexRepo ();
                    const roleRepo = new RoleKnexRepo ();
                    const statusRepo = new StatusKnexRepo ();
                    const { id, ...input } = request;
                    const sut = new service.FetchOneUser (
                        roleRepo,
                        statusRepo,
                        userRepo
                    );

                    // Act
                    const sut_action = async () => {
                        await sut.fetchOne (input);
                    }

                    // Assert
                    assert.rejects (sut_action, expected)
                });
            });
        });*/

    });

    describe ('Service: update', function () {

        beforeEach (loadDataToDB);

        describe ('Successful requests', function () {
            data.successfulUpdate.forEach (({ request, expected }) => {
                it (`${request.id}`, async function () {
                    // Arrange
                    const repo = new ProfileKnexRepo ();
                    const { id, ...input } = request;

                    // sut.action ()
                    const user = await service.update (repo, input);

                    // Assert
                    assert.equal (user.code, expected.code);
                    assert.notEqual (user.createdAt, expected.createdAt);
                    assert.notEqual (user.updatedAt, expected.updatedAt);
                    assert.equal (user.firstName, expected.firstName);
                    assert.equal (user.lastName, expected.lastName);
                    assert.equal (user.gender, expected.gender);
                    assert.equal (user.birthDate, expected.birthDate);
                    assert.equal (user.phoneNumber, expected.phoneNumber);
                    assert.equal (user.image, expected.image);
                });
            });
        });

        /*describe ('Failed requests', function () {
            data.failedUpdate.forEach (({ request, expected }) => {
                it (`${request.id}`, async function () {
                    // Arrange
                    const userRepo = new UserKnexRepo ();
                    const roleRepo = new RoleKnexRepo ();
                    const statusRepo = new StatusKnexRepo ();
                    const { id, ...input } = request;
                    const sut = new service.UpdateUser (
                        roleRepo,
                        statusRepo,
                        userRepo
                    );

                    // Act
                    const sut_action = async () => {
                        await sut.update (input);
                    }

                    // Assert
                    assert.rejects (sut_action, expected)
                });
            });
        });*/

    });

    describe ('Service: remove', function () {

        beforeEach (loadDataToDB);

        describe ('Successful requests', function () {
            data.successfulDelete.forEach (({ request, expected }) => {
                it (`${request.id}`, async function () {
                    // Arrange
                    const repo = new ProfileKnexRepo ();
                    const { id, ...input } = request;

                    // sut.action ()
                    const result = await service.remove (repo, input);

                    // Assert
                    assert.equal (result, expected);
                });
            });
        });

        /*describe ('Failed requests', function () {
            data.failedDelete.forEach (({ request, expected }) => {
                it (`${request.id}`, async function () {
                    // Arrange
                    const userRepo = new UserKnexRepo ();
                    const roleRepo = new RoleKnexRepo ();
                    const statusRepo = new StatusKnexRepo ();
                    const { id, ...input } = request;
                    const sut = new service.RemoveUser (
                        roleRepo,
                        statusRepo,
                        userRepo
                    );

                    // Act
                    const sut_action = async () => {
                        await sut.remove (input);
                    }

                    // Assert
                    assert.rejects (sut_action, expected)
                });
            });
        });*/
    });

});