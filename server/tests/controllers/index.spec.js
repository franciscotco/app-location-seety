const expect = require('chai').expect;
const request = require('supertest');
import { app } from '../../index';

// Constant
const { SORT_KEYS } = require('../../constants');

describe('Greetings Route', function() {
    describe('getCloseReports() function', function() {
        it('Should error out if no name provided ', function() {
            request(app)
            .get('/report/50/50/null')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400, `Error: Wrong param {sort} only take [${SORT_KEYS}]`);
        });
    })
});