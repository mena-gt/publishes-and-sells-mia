
class Profile {
    constructor (
        code,
        created,
        updated,
        lastLogin,
        firstName, 
        lastName,
        gender,
        phoneNumber, 
        password, 
        email, 
        image,
        birthDate,
        availableCredit,
        earnings,
        roleInstance) {
        this.code = code;
        this.createdAt = created;
        this.updatedAt = updated;
        this.lastLogin = lastLogin;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.password = password;
        this.email = email;
        this.image = image;
        this.birthDate = birthDate;
        this.availebleCredit = availableCredit;
        this.earnings = earnings;
        this.role = roleInstance;
    }

    update (firstName, lastName, gender, phoneNumber, image, birthDate) {
        this.updatedAt = new Date (Date.now ());
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.image = image;
        this.birthDate = birthDate;
    }

    toObject () {
        return {
            code: this.code,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            lastLogin: this.lastLogin,
            firstName: this.firstName,
            lastName: this.lastName,
            gender: this.gender,
            phoneNumber: this.phoneNumber,
            password: this.password,
            email: this.email,
            image: this.image,
            birthDate: this.birthDate,
            availableCredit: this.availebleCredit,
            earnings: this.earnings,
            role: this.role.toObject (),
        };
    }
}

class Role {
    constructor (code, name, codename, description) {
        this.code = code;
        this.name = name;
        this.codename = codename;
        this.description = description;
    }

    toObject () {
        return {
            code: this.code,
            name: this.name,
            codename: this.codename,
            description: this.description
        };
    }
}

const fromSQLToRole = (row) => {
    return new Role (
        row.role_code,
        row.role_name,
        row.role_codename,
        row.role_description,
    )
}

const fromSQLToProfile = (row) => {
    const roleInstance = fromSQLToRole (row);
    return new Profile (
        row.user_code,
        row.user_created,
        row.user_updated,
        row.user_lastlogin,
        row.user_fname,
        row.user_lname,
        row.user_gender,
        row.user_phonenum,
        row.user_password,
        row.user_email,
        row.user_image,
        row.user_birthdate,
        row.user_availablecredit,
        row.user_earnings,
        roleInstance
    )
}

module.exports = {
    Profile,
    fromSQLToProfile
};