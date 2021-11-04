
const successfulFetch = [
    {
        request: {
            id: "Fetch my profile",
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
            availableCredit: 0.00,
            earnings: 0.00,
            role: {
                code: 1,
                name: 'Administrator',
                codename: 'ADMIN_ROLE',
                description: null
            }
        },
    },
];

const successfulUpdate = [
    {
        request: {
            id: "Update the info of my profile",
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
        }
    }
];

const successfulDelete = [
    {
        request: {
            id: "Delete my profile",
            code: 2
        }, 
        expected: true
    }
];

module.exports = {
    successfulFetch,
    successfulUpdate,
    successfulDelete
}