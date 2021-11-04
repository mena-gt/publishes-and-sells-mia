const { 
    ColorDoesNotExist,
    ColorAlreadyExists
} = require ('../../../src/api/color/errors.js');


const successfulCreation = [
    {
        request: {
            id: "Create new color",
            name: "Cupid", 
            hexvalue: "#bc0858",
        }, 
        expected: {
            code: 18,
            name: 'Cupid',
            hex: "#bc0858"
        }
    }
];

const failedCreation = [
    {
        request: {
            id: "Color's name already exists",
            name: "Marron", 
            hexvalue: "#efefef"
        }, 
        expected: new ColorAlreadyExists ("Marron", "#efefef")
    },
    {
        request: {
            id: "Color's hex value already exists",
            name: "WhiteBlack", 
            hexvalue: "#800080",
        }, 
        expected: new ColorAlreadyExists ("WhiteBlack", "#800080")
    }
];

const successfulRecovery = [
    {
        request: {
            id: "Category with registers"
        }, 
        expected: [
            { code: 1,  hex: "#800000", name: "Marron" },
            { code: 2,  hex: "#ff0000", name: "Red" },
            { code: 3,  hex: "#ffa500", name: "Orange" },
            { code: 4,  hex: "#ffff00", name: "Yellow" },
            { code: 5,  hex: "#808000", name: "Olive" },
            { code: 6,  hex: "#800080", name: "Purple" },
            { code: 7,  hex: "#ff00ff", name: "Fuchsia" },
            { code: 8,  hex: "#ffffff", name: "White" },
            { code: 9,  hex: "#00ff00", name: "Lime" },
            { code: 10, hex: "#008000", name: "Green" },
            { code: 11, hex: "#000080", name: "Navy" },
            { code: 12, hex: "#0000ff", name: "Blue" },
            { code: 13, hex: "#00ffff", name: "Agua" },
            { code: 14, hex: "#008080", name: "Teal" },
            { code: 15, hex: "#000000", name: "Black" },
            { code: 16, hex: "#c0c0c0", name: "Silver" },
            { code: 17, hex: "#8080",   name: "Gray" }
        ]
    }
];

const successfulUpdate = [
    {
        request: {
            id: "Update color name",
            code: 2,
            name: "Reddy", 
            hexvalue: "#ff0000",
        }, 
        expected: {
            code: 2,
            name: "Reddy",
            hex: "#ff0000"
        }
    },
    {
        request: {
            id: "Update color's hex value",
            code: 9,
            name: "Lime", 
            hexvalue: "#00ffbf"
        }, 
        expected: {
            code: 9,
            name: "Lime",
            hex: "#00ffbf"
        }
    },
];

const failedUpdate = [
    {
        request: {
            id: "Update color with a name already exists",
            code: 2,
            name: "White", 
            hexvalue: "#ff0000"
        },
        expected: new ColorAlreadyExists ("White", "#ff0000")
    },
    {
        request: {
            id: "Update color with a hex value already exists",
            code: 9,
            name: "Lime", 
            hexvalue: "#ffff00"
        }, 
        expected: new ColorAlreadyExists ("Lime", "#ffff00")
    },
    {
        request: {
            id: "The color for update it does not exist",
            code: 99,
            name: "Shine", 
            hexvalue: "#0e0e0e"
        }, 
        expected: new ColorDoesNotExist ("99")
    }
];

const successfulFetch = [
    {
        request: {
            id: "Fetch a color already exists",
            code: 10
        }, 
        expected: { 
            code: 10, 
            hex: "#008000", 
            name: "Green" 
        },
    },
];

const failedFetch = [
    {
        request: {
            id: "Fetch a color does not exist",
            code: 99
        }, 
        expected: new ColorDoesNotExist ("99")
    },
];

const successfulDelete = [
    {
        request: {
            id: "Delete a color already exists",
            code: 5
        }, 
        expected: true
    }
];

const failedDelete = [
    {
        request: {
            id: "Delete a category does not exist",
            code: 58
        }, 
        expected: new ColorDoesNotExist ("58")
    }
];

module.exports = {
    successfulCreation,
    failedCreation,
    successfulRecovery,
    successfulUpdate,
    failedUpdate,
    successfulFetch,
    failedFetch,
    successfulDelete,
    failedDelete
}