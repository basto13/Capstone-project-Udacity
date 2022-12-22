const request = require('supertest');
var app = require('../server/server').app;

describe('server express functions', () => {
    it('get all info', async () => {
        const response = await request(app)
            .get('/all')
            .set('Accept', 'application/json')
        expect(response.status).toEqual(200);
        expect(response.headers["content-type"]).toMatch(/json/);
    })
})