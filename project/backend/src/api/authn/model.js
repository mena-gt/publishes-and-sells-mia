
function getRandomNumber (min, max) {
  return Math.floor (Math.random() * (max - min)) + min;
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

class AccountType {
    constructor (code, name, codename, amount) {
        this.code = code;
        this.name = name;
        this.codename = codename;
        this.amount = amount
    }

    toObject () {
        return {
            code: this.code,
            name: this.name,
            codename: this.codename,
            amount: this.amount
        };
    }
}

const fromSQLToAccountType = (row) => {
    return new AccountType (
        row.usertype_code,
        row.usertype_name,
        row.usertype_codename,
        row.usertype_amount
    );
};

class AccountStatus {
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
    return new AccountStatus (
        row.status_code,
        row.status_name,
        row.status_codename
    );
};

class User {
    constructor (
        code,
        createdAt,
        firstName,
        lastName, 
        email, 
        password, 
        availableCredit,
        earnings,
        accountType,
        accountStatus,        
        role) {
        
        this.code = code;
        this.createdAt = createdAt;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.availableCredit = availableCredit;
        this.earnings = earnings;
        this.accountType = accountType;
        this.accountStatus = accountStatus;
        this.role = role;
    }

    setRandomAccounType (accountTypes) {
        const minimumValue = 0;
        const maximumValue = accountTypes.length;
        let randomNumber = getRandomNumber (minimumValue, maximumValue);
        this.accountType = accountTypes[randomNumber];
        this.availableCredit = this.accountType.amount;
    }

    toObject () {
        return {
            code: this.code,
            firtsName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            availableCredit: this.availableCredit,
            earnings: this.earnings,
            status: this.accountStatus.toObject (),
            type: this.accountType.toObject (),
            role: this.role.toObject ()
        }
    }
}

const buildClass = (
    firstName, 
    lastName, 
    email, 
    password,
    accountStatus, 
    role) => {
    return new User (
        undefined,
        new Date (Date.now ()),
        firstName,
        lastName,
        email,
        password,
        0.00,
        0.00,
        null,
        accountStatus,
        role
    );
}

const fromSQLToUser = (row) => {
    const accountType = fromSQLToAccountType (row);
    const accountStatus = fromSQLToStatus (row);
    const role = fromSQLToRole (row);
    return new User (
        row.user_code,
        row.user_created,
        row.user_fname,
        row.user_lname,
        row.user_email,
        row.user_password,
        row.user_availablecredit,
        row.user_earnings,
        accountType,
        accountStatus,
        role
    );
}

module.exports = {
    fromSQLToRole,
    fromSQLToAccountType,
    fromSQLToStatus,
    buildClass,
    fromSQLToUser
};