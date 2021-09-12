const request = require('supertest');
const app = require('./app');
const { connect, close } = require('./config/database');

beforeAll(async () => {
    await connect();
});

afterAll(async () => {
    await close();
});

describe("", () => {
    test("", async () => {
        const res = await request(app).get('/wrong-endpoint');
        expect(res.statusCode).toEqual(404);
    });

    test("", async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
    });

    test("", async () => {
        const res = await request(app).get('/api');
        expect(res.statusCode).toEqual(404);
    });


});