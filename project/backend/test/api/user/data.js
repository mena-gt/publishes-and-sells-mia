const { 
    UserDoesNotExist,
    UserAlreadyExists,
    RoleDoesNotExist
} = require ('../../../src/api/user/errors.js');

const successfulFetch = [
    {
        request: {
            id: "Fetch a user already exists",
            code: 1
        }, 
        expected: {
            code: 1,
            createdAt: "2021-10-14 00:00:00",
            updatedAt: null,
            lastLogin: null,
            firstName: 'User Firstname',
            lastName: 'User Lastname',
            gender: 'M',
            birthDate: null,
            phoneNumber: null,
            email: 'firstuser@none.com',
            password: 'test@test',
            image: null,
            status: {
                code: 1,
                name: 'Activa',
                codename: 'ACTIVE_STATUS'
            },
            role: {
                code: 1,
                name: 'Administrator',
                codename: 'ADMIN_ROLE',
                description: null
            }
        },
    },
];

const failedFetch = [
    {
        request: {
            id: "Fetch a user does not exist",
            code: 15
        }, 
        expected: new UserDoesNotExist ("15")
    },
];

const successfulRecovery = [
    {
        request: {
            id: "User with registers"
        }, 
        expected: [
            {
                code: 1,
                createdAt: "2021-10-14 00:00:00",
                updatedAt: null,
                lastLogin: null,
                firstName: 'User Firstname',
                lastName: 'User Lastname',
                gender: 'M',
                birthDate: null,
                phoneNumber: null,
                email: 'firstuser@none.com',
                password: 'test@test',
                image: null,
                status: {
                    code: 1,
                    name: 'Activa',
                    codename: 'ACTIVE_STATUS'
                },
                role: {
                    code: 1,
                    name: 'Administrator',
                    codename: 'ADMIN_ROLE',
                    description: null
                }
            },
            {
                code: 2,
                createdAt: "2021-10-14 00:00:00",
                updatedAt: null,
                lastLogin: null,
                firstName: 'User Secondname',
                lastName: 'User Lastname',
                gender: 'F',
                birthDate: null,
                phoneNumber: null,
                email: 'seconduser@none.com',
                password: 'test@test',
                image: null,
                status: {
                    code: 2,
                    name: 'Inactiva',
                    codename: 'INACTIVE_STATUS'
                },
                role: {
                    code: 2,
                    name: 'Help Desk',
                    codename: 'HELPDESK_ROLE',
                    description: null
                }
            },
            {
                code: 3,
                createdAt: "2021-10-14 00:00:00",
                updatedAt: null,
                lastLogin: null,
                firstName: 'User Thirdname',
                lastName: 'User Lastname',
                gender: 'F',
                birthDate: null,
                phoneNumber: null,
                email: 'thirduser@none.com',
                password: 'test@test',
                image: null,
                status: {
                    code: 3,
                    name: 'Congelada',
                    codename: 'BLOCKED_STATUS'
                },
                role: {
                    code: 1,
                    name: 'Administrator',
                    codename: 'ADMIN_ROLE',
                    description: null
                }
            },
            {
                code: 4,
                createdAt: "2021-10-14 00:00:00",
                updatedAt: null,
                lastLogin: null,
                firstName: 'User fourthname',
                lastName: 'User Lastname',
                gender: 'F',
                birthDate: null,
                phoneNumber: null,
                email: 'fourthuser@none.com',
                password: 'test@test',
                image: null,
                status: {
                    code: 4,
                    name: 'Eliminada',
                    codename: 'DELETED_ACCOUNT'
                },
                role: {
                    code: 2,
                    name: 'Help Desk',
                    codename: 'HELPDESK_ROLE',
                    description: null
                }
            },
            {
                code: 5,
                createdAt: "2021-10-14 00:00:00",
                updatedAt: null,
                lastLogin: null,
                firstName: 'Firstname Client1',
                lastName: 'Lastname Client1',
                gender: 'M',
                birthDate: null,
                phoneNumber: null,
                email: 'client1@none.com',
                password: 'test@test',
                image: null,
                status: {
                    code: 1,
                    name: 'Activa',
                    codename: 'ACTIVE_STATUS'
                },
                role: {
                    code: 3,
                    name: 'Client',
                    codename: 'CLIENT_ROLE',
                    description: null
                }
            },
            {
                code: 6,
                createdAt: "2021-10-14 00:00:00",
                updatedAt: null,
                lastLogin: null,
                firstName: 'Firstname Client2',
                lastName: 'Lastname Client2',
                gender: 'M',
                birthDate: null,
                phoneNumber: null,
                email: 'client2@none.com',
                password: 'test@test',
                image: null,
                status: {
                    code: 1,
                    name: 'Activa',
                    codename: 'ACTIVE_STATUS'
                },
                role: {
                    code: 3,
                    name: 'Client',
                    codename: 'CLIENT_ROLE',
                    description: null
                }
            }
        ]
    }
];

const successfulCreation = [
    {
        request: {
            id: "Create new user with role Admin and inactive status by default",
            firstname: 'NewFirst User',
            lastname: 'NewLast Name',
            gender: undefined,
            birthdate: undefined,
            phonenumber: undefined,
            email: 'newuser@none.com',
            password: '##test@test##',
            image: undefined,
            role: '1'
        }, 
        expected: {
                code: 7,
                createdAt: "2021-10-14",
                updatedAt: null,
                lastLogin: null,
                firstName: 'NewFirst User',
                lastName: 'NewLast Name',
                gender: null,
                birthDate: null,
                phoneNumber: null,
                email: 'newuser@none.com',
                password: '##test@test##',
                image: null,
                status: {
                    code: 2,
                    name: 'Inactiva',
                    codename: 'INACTIVE_STATUS'
                },
                role: {
                    code: 1,
                    name: 'Administrator',
                    codename: 'ADMIN_ROLE',
                    description: null
                }
            },
    }
];

const failedCreation = [
    {
        request: {
            id: "User's email already exists",
            firstname: 'NewFirst User',
            lastname: 'NewLast Name',
            gender: undefined,
            birthdate: undefined,
            phonenumber: undefined,
            email: 'fourthuser@none.com',
            password: '##test@test##',
            image: undefined,
            role: '1'
        }, 
        expected: new UserAlreadyExists ("fourthuser@none.com")
    },
    {
        request: {
            id: "User's role does not exist",
            firstname: 'NewFirst User',
            lastname: 'NewLast Name',
            gender: undefined,
            birthdate: undefined,
            phonenumber: undefined,
            email: 'fourthuser@none.com',
            password: '##test@test##',
            image: undefined,
            role: '11'
        }, 
        expected: new RoleDoesNotExist ("11")
    }
];

const successfulUpdate = [
    {
        request: {
            id: "Update user adding all info",
            code: 2,
            firstname: 'Updated FirstName',
            lastname: 'updated LastName',
            gender: 'M',
            birthdate: '01/01/1980',
            phonenumber: '(000) 0000-0000',
            email: 'seconduser@none.com',
            password: 'test@test',
            image: 'media/static/image.png',
            role: '2'
        }, 
        expected: {
            code: 2,
            createdAt: null,
            updatedAt: null,
            lastLogin: null,
            firstName: 'Updated FirstName',
            lastName: 'updated LastName',
            gender: 'M',
            birthDate: '01/01/1980',
            phoneNumber: '(000) 0000-0000',
            email: 'seconduser@none.com',
            password: 'test@test',
            image: 'media/static/image.png',
            status: {
                code: 2,
                name: 'Inactiva',
                codename: 'INACTIVE_STATUS'
            },
            role: {
                code: 2,
                name: 'Help Desk',
                codename: 'HELPDESK_ROLE',
                description: null
            }
        }
    }
];

const failedUpdate = [
    {
        request: {
            id: "The user for update it does not exist",
            code: 23,
            firstname: 'Updated FirstName',
            lastname: 'updated LastName',
            gender: 'M',
            birthdate: '01/01/1980',
            phonenumber: '(000) 0000-0000',
            email: 'seconduser@none.com',
            password: 'test@test',
            image: 'media/static/image.png',
            role: '2'
        },
        expected: new UserDoesNotExist ("23")
    },
    {
        request: {
            id: "User's role does not exist",
            code: 2,
            firstname: 'Updated FirstName',
            lastname: 'updated LastName',
            gender: 'M',
            birthdate: '01/01/1980',
            phonenumber: '(000) 0000-0000',
            email: 'seconduser@none.com',
            password: 'test@test',
            image: 'media/static/image.png',
            role: '11'
        }, 
        expected: new RoleDoesNotExist ("11")
    }
];

const successfulDelete = [
    {
        request: {
            id: "Delete a user already exists",
            code: 2
        }, 
        expected: true
    }
];

const failedDelete = [
    {
        request: {
            id: "Delete a user does not exist",
            code: 15
        }, 
        expected: new UserDoesNotExist ("15")
    }
];

module.exports = {
    successfulFetch,
    failedFetch,
    successfulRecovery,
    successfulCreation,
    failedCreation,
    successfulUpdate,
    failedUpdate,
    successfulDelete,
    failedDelete
};