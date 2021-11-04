const assert = require ('assert');

const { UserKnexRepo, 
        RoleKnexRepo, 
        StatusKnexRepo } = require ('./user.repo.js');
const { db, createTables, dropTables } = require ('../../db.config');
const service = require ('../../../src/api/user/services.js');
const data = require ('./data.js');


const loadDataToDB = function () {
    return new Promise (async (resolve) => {
        await db.seed.run ('users.js');
        resolve ();
    });
};


describe ('Integration tests: User Api', function () {
    
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
                    const userRepo = new UserKnexRepo ();
                    const roleRepo = new RoleKnexRepo ();
                    const statusRepo = new StatusKnexRepo ();
                    const { id, ...input } = request;
                    const sut = new service.FetchOneUser (
                        roleRepo,
                        statusRepo,
                        userRepo
                    );

                    // sut.action ()
                    const user = await sut.fetchOne (input);

                    // Assert
                    assert.deepEqual (user.toObject (), expected);
                });
            });
        });

        describe ('Failed requests', function () {
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
        });

    });

    describe ('Service: fetchAll', function () {

        describe ('Successful requests', function () {
            it (`Category without registers`, async function () {
                // Arrange
                const userRepo = new UserKnexRepo ();
                const roleRepo = new RoleKnexRepo ();
                const statusRepo = new StatusKnexRepo ();
                // const { id, ...input } = request;
                const sut = new service.FetchAllUser (
                    roleRepo,
                    statusRepo,
                    userRepo
                );
                //const { id, ...input } = request;

                // sut.action ()
                const users = await sut.fetchAll ();

                // Assert
                assert.deepStrictEqual (users, []);
            });
        });

        describe ('Successful requests', function () {

            beforeEach (loadDataToDB);

            data.successfulRecovery.forEach (({ request, expected }) => {
                it (`${request.id}`, async function () {
                    // Arrange
                    const userRepo = new UserKnexRepo ();
                    const roleRepo = new RoleKnexRepo ();
                    const statusRepo = new StatusKnexRepo ();
                    // const { id, ...input } = request;
                    const sut = new service.FetchAllUser (
                        roleRepo,
                        statusRepo,
                        userRepo
                    );
                    // const { id, ...input } = request;

                    // sut.action ()
                    const users = await sut.fetchAll ();

                    // Assert
                    usersObject = users.map ((user) => user.toObject ());
                    assert.deepStrictEqual (usersObject, expected);
                });
            });
        });
    });

    describe ('Service: create', function () {
        
        beforeEach (loadDataToDB);

        describe ('Successful requests', function () {
            data.successfulCreation.forEach (({ request, expected }) => {
                it (`${request.id}`, async function () {
                    // Arrange
                    const userRepo = new UserKnexRepo ();
                    const roleRepo = new RoleKnexRepo ();
                    const statusRepo = new StatusKnexRepo ();
                    const { id, ...input } = request;
                    const sut = new service.CreateUser (
                        roleRepo,
                        statusRepo,
                        userRepo
                    );

                    // sut.action ()
                    const user = await sut.create (input);

                    // Assert
                    assert.strictEqual (user.code, expected.code);
                    assert.notDeepEqual (user.createdAt, expected.createdAt);
                    assert.equal (user.updatedAt, expected.updatedAt);
                    assert.equal (user.lastLogin, expected.lastLogin);
                    assert.equal (user.firstName, expected.firstName);
                    assert.equal (user.lastName, expected.lastName);
                    assert.equal (user.gender, expected.gender);
                    assert.equal (user.birthDate, expected.birthDate);
                    assert.equal (user.phoneNumber, expected.phoneNumber);
                    assert.equal (user.email, expected.email);
                    assert.equal (user.password, expected.password);
                    assert.equal (user.image, expected.image);
                    assert.equal (user.accountStatus.code, expected.status.code);
                    assert.equal (user.accountStatus.name, expected.status.name);
                    assert.equal (user.accountStatus.codename, expected.status.codename);
                    assert.equal (user.role.code, expected.role.code);
                    assert.equal (user.role.name, expected.role.name);
                    assert.equal (user.role.codename, expected.role.codename);
                    assert.equal (user.role.description, expected.role.description);
                });
            });
        });

        describe ('Failed requests', function () {
            data.failedCreation.forEach (({ request, expected }) => {
                it (`${request.id}`, async function () {
                    // Arrange
                    const userRepo = new UserKnexRepo ();
                    const roleRepo = new RoleKnexRepo ();
                    const statusRepo = new StatusKnexRepo ();
                    const { id, ...input } = request;
                    const sut = new service.CreateUser (
                        roleRepo,
                        statusRepo,
                        userRepo
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

                    // sut.action ()
                    const user = await sut.update (input);

                    // Assert
                    assert.equal (user.code, expected.code);
                    assert.notEqual (user.createdAt, expected.createdAt);
                    assert.notEqual (user.updatedAt, expected.updatedAt);
                    assert.equal (user.lastLogin, expected.lastLogin);
                    assert.equal (user.firstName, expected.firstName);
                    assert.equal (user.lastName, expected.lastName);
                    assert.equal (user.gender, expected.gender);
                    assert.equal (user.birthDate, expected.birthDate);
                    assert.equal (user.phoneNumber, expected.phoneNumber);
                    assert.equal (user.email, expected.email);
                    assert.equal (user.password, expected.password);
                    assert.equal (user.image, expected.image);
                    assert.equal (user.accountStatus.code, expected.status.code);
                    assert.equal (user.accountStatus.name, expected.status.name);
                    assert.equal (user.accountStatus.codename, expected.status.codename);
                    assert.equal (user.role.code, expected.role.code);
                    assert.equal (user.role.name, expected.role.name);
                    assert.equal (user.role.codename, expected.role.codename);
                    assert.equal (user.role.description, expected.role.description);
                });
            });
        });

        describe ('Failed requests', function () {
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
        });

    });

    describe ('Service: remove', function () {

        beforeEach (loadDataToDB);

        describe ('Successful requests', function () {
            data.successfulDelete.forEach (({ request, expected }) => {
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

                    // sut.action ()
                    const result = await sut.remove (input);

                    // Assert
                    assert.equal (result, expected);
                });
            });
        });

        describe ('Failed requests', function () {
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
        });
    });
});