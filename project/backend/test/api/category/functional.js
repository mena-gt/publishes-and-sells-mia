const assert = require ('assert');
const supertest = require ('supertest');

const app = require ('../../../src/express.js');

/**
// arrange
const request = supertest (app);

// act
const response = request.get ('/api/categories');

// assert
response.expect (200)
    .expect ((res) =>{
        expect (res.body).toInclude ({
            success: true
        })
    })
    .end (done);
 **/
describe ('Functional tests: Category Api', function () {
    describe ('GET /api/categories', function () {
        it ('Good path:', function () { });
    });

    describe ('POST /api/categories', function () {
        it ('Good path:', function () { });
    });

    describe ('GET /api/categories/:id', function () {
        it ('Good path:', function () { });
    });

    describe ('PUT /api/categories/:id', function () {
        it ('Good path:', function () { });
    });

    describe ('DELETE /api/categories/:id', function () {
        it ('Good path:', function () { });
    });
})
