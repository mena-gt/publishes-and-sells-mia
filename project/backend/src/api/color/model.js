
class Color {
    constructor (code, name, hexValue) {
        this.code = code;
        this.name = name;
        this.hex = hexValue;
    }

    update (name, hexValue) {
        this.name = name;
        this.hex = hexValue;
    }

    toObject () {
        return {
            code: this.code,
            name: this.name,
            hex: this.hex
        }
    }
}

const buildClass = (name, hexValue) => {
    return new Color (
        undefined, 
        name, 
        hexValue
    )
}

const fromSQLToColor = (row) => {
    return new Color (
        row.color_code,
        row.color_name,
        row.color_hex
    )
}

module.exports = {
    Color,
    buildClass,
    fromSQLToColor
};