const supertest = require('supertest');
const server = require('../api/server');
const db  = require("../database/dbConfig");

beforeEach(async () => {
    await db.seed.run()
});

afterAll(async () => {
    await db.destroy()
});

test('register route', async () => {
   const res = await supertest(server)
       .post('/api/auth/register')
       .send({username: 'marry', password: '147'});
   expect(res.statusCode).toBe(201);
});

test('register route, no password', async () => {
    const res = await supertest(server)
        .post('/api/auth/register')
        .send({username: 'smith'});
    expect(res.statusCode).toBe(500)
});

test('login route, not registered', async () => {
    const user = {
        username: 'joe',
        password: '123'
    };
    const res = await supertest(server)
        .post('/api/auth/login')
        .send(user);
    expect(res.statusCode).toBe(401);
    expect(res.type).toBe('application/json');
});

test('login route wrong password', async () => {
    const res = await supertest(server)
        .post('/api/auth/login')
        .send({ username: 'Bob', password: '555'});
    expect(res.statusCode).toBe(401);
    expect(res.body.errorMessage).toMatch(/invalid/i);
});
