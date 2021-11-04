const assert = require ('assert');

const { UserKnexRepo,
        RoleKnexRepo,
        TypeKnexRepo,
        StatusKnexRepo } = require ('./user.repo.js');
const { db, createTables, dropTables } = require ('../../db.config');
const service = require ('../../../src/api/authn/services.js');
const data = require ('./data.js');


const loadDataToDB = function () {
    return new Promise (async (resolve) => {
        await db.seed.run ('users.js');
        resolve ();
    });
};


describe ('Integration tests: Authentication Api', function () {
    
    beforeEach (function () {
        return createTables ('20211013181725_user.js');
    });
    afterEach (dropTables);

    describe ('Service: Signup', function () {
        
        beforeEach (loadDataToDB);

        describe ('Successful requests', function () {
            data.successfulSignup.forEach (({ request, expected }) => {
                it (`${request.id}`, async function () {
                    // Arrange
                    const userRepo = new UserKnexRepo ();
                    const roleRepo = new RoleKnexRepo ();
                    const typeRepo = new TypeKnexRepo ();
                    const statusRepo = new StatusKnexRepo ();
                    const { id, ...input } = request;
                    const sut = new service.SignupAuthn (
                        userRepo,
                        roleRepo,
                        typeRepo,
                        statusRepo
                    );

                    // sut.action ()
                    const user = await sut.signup (input);

                    // Assert
                    assert.equal (user.code, expected.code);
                    /*assert.notDeepEqual (user.createdAt, expected.createdAt);
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
                    assert.equal (user.role.description, expected.role.description);*/
                });
            });
        });

        /*describe ('Failed requests', function () {
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
        });*/

    });

    describe ('Service: Signin', function () {

        beforeEach (loadDataToDB);

        describe ('Successful requests', function () {
            data.successfulSignin.forEach (({ request, expected }) => {
                it.skip (`${request.id}`, async function () {
                    // Arrange
                    const userRepo = new UserKnexRepo ();
                    const roleRepo = new RoleKnexRepo ();
                    const statusRepo = new StatusKnexRepo ();
                    const { id, ...input } = request;
                    const sut = new service.SigninAuthn (
                        userRepo,
                        roleRepo,
                        statusRepo
                    );

                    // sut.action ()
                    const user = await sut.signin (input);

                    // Assert
                    assert.equal (user.code, expected.code);
                    // assert.notEqual (user.createdAt, expected.createdAt);
                    // assert.notEqual (user.updatedAt, expected.updatedAt);
                    // assert.equal (user.lastLogin, expected.lastLogin);
                    assert.equal (user.firstName, expected.firstName);
                    assert.equal (user.lastName, expected.lastName);
                    // assert.equal (user.gender, expected.gender);
                    // assert.equal (user.birthDate, expected.birthDate);
                    // assert.equal (user.phoneNumber, expected.phoneNumber);
                    assert.equal (user.email, expected.email);
                    assert.equal (user.password, expected.password);
                    // assert.equal (user.image, expected.image);
                    // assert.equal (user.accountStatus.code, expected.status.code);
                    // assert.equal (user.accountStatus.name, expected.status.name);
                    // assert.equal (user.accountStatus.codename, expected.status.codename);
                    // assert.equal (user.role.code, expected.role.code);
                    // assert.equal (user.role.name, expected.role.name);
                    // assert.equal (user.role.codename, expected.role.codename);
                    // assert.equal (user.role.description, expected.role.description);
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

   /* describe ('Service: Signout', function () {

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
    });*/
});