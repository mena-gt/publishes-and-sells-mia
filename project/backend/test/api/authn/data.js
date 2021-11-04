
const successfulSignup = [
    {
        request: {
            id: "Sign up with new user",
            firstname: 'NewLast Firstname',
            lastname: 'NewLast Lastname',
            email: 'default@none.com',
            password: '321test123',
            repassw: '321test123'
        }, 
        expected: {
            code: 7,
            createdAt: "2021-10-14 00:00:00",
            updatedAt: null,
            lastLogin: null,
            firstName: 'NewLast Firstname',
            lastName: 'NewLast Lastname',
            gender: null,
            birthDate: null,
            phoneNumber: null,
            email: 'default@none.com',
            password: '321test123',
            image: null,

            status: {
                code: 1,
                name: 'Activa',
                codename: 'ACTIVE_STATUS'
            },
            role: {
                code: 3,
                name: 'Administrator',
                codename: 'ADMIN_ROLE',
                description: null
            }
        },
    },
];

const successfulSignin = [
    {
        request: {
            id: "Sign in with user already exists",
            email: 'firstuser@none.com',
            password: 'test@test'
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

module.exports = {
    successfulSignup,
    successfulSignin
}