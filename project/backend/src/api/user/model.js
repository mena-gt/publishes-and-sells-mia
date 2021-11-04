
class User {
    constructor (
        code,
        created,
        updated,
        lastLogin,
        firstName,
        lastName,
        gender,
        birthDate,
        phoneNumber,
        email,
        image,
        password,
        accountStatusInstance,
        roleInstance,
        ) {
        this.code = code;
        this.createdAt = created;
        this.updatedAt = updated;
        this.lastLogin = lastLogin;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.birthDate = birthDate;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.image = image;
        this.password = password;
        this.accountStatus = accountStatusInstance;
        this.role = roleInstance;
    }
    
    update (
        firstName,
        lastName,
        gender,
        birthDate,
        phoneNumber,
        image,
        role
        ) {
        this.updatedAt = new Date (Date.now ());
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.birthDate = birthDate;
        this.phoneNumber = phoneNumber;
        this.image = image;
        this.role = role;
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
            birthDate: this.birthDate,
            phoneNumber: this.phoneNumber,
            email: this.email,
            image: this.image,
            password: this.password,
            status: this.accountStatus.toObject (),
            role: this.role.toObject ()
        }
    }
}

const buildClass = (firstName,
                    lastName,
                    gender,
                    birthdate,
                    phoneNumber,
                    email,
                    image,
                    password,
                    accountStatusInstance,
                    roleInstance) => {
    return new User (
        undefined,
        new Date (Date.now ()),
        null,
        null,
        firstName,
        lastName,
        gender === undefined ? null: gender,
        birthdate === undefined ? null: birthdate,
        phoneNumber === undefined ? null: phoneNumber,
        email,
        image === undefined ? null: gender,
        password,
        accountStatusInstance,
        roleInstance
    );
}

const fromSQLToUser = (row) => {
    const roleInstance = fromSQLToRole (row);
    const statusInstance = fromSQLToStatus (row);
    return new User (
        row.user_code,
        row.user_created,
        row.user_updated,
        row.user_lastlogin,
        row.user_fname,
        row.user_lname,
        row.user_gender,
        row.user_birthdate,
        row.user_phonenum,
        row.user_email,
        row.user_image,
        row.user_password,
        statusInstance,
        roleInstance
    );
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
        row.role_description
    );
}

class Status {
    constructor (code, name, codename) {
        this.code = code;
        this.name = name;
        this.codename = codename;
    }

    toObject () {
        return {
            code: this.code,
            name: this.name,
            codename: this.codename
        };
    }
}

const fromSQLToStatus = (row) => {
    return new Status (
        row.status_code,
        row.status_name,
        row.status_codename
    );
};

module.exports = {
    User,
    buildClass,
    fromSQLToRole,
    fromSQLToStatus,
    fromSQLToUser
};