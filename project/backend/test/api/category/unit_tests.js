const assert = require ('assert');
const path = require ('path');

const { validateCategory } = require ('../../../src/api/category/validations.js');
const { rawInputData } = require ('./data.js');


describe ('Unit tests: Category Api', function () {
    /*describe ('Input Validations', async function () {
        rawInputData.forEach (({ args, expected }) => {
            it (`should pass`, async function () {
                // Arrange
                let { name, description, parent } = args;
                
                // Act
                const {error, value} = await validateCategory (name, description, parent);

                // Assert
                assert.equal (error, expected);
            })
        });
    });*/

    // describe ('Domain Models', function () {});
    // describe ('Custom Errors', function () {});
    // describe ('Repository', function () {});


    /*describe ('Validate joi:', function () {
        it ('should pass without error', async function () {
            // Arrange
            const name = 'Cat1';
            const description = 'A brief description of a category.';
            const parent = undefined;

            // Act
            const res = await validateCategory (name, description, parent);

            // Assert
            assert.equal (res.name, name);
        });

        it ('should pass with error', async function () {
            // Arrange
            const name = '';
            const description = 'A brief description of a category.';
            const parent = undefined;

            // Act
            try { const res = await validateCategory (name, description, parent); }
            
            // Assert
            catch (error) {
                assert.equal (error.statusCode (), 400)
            }
        });
    });*/
});



