const supertest = require('supertest');
const server = require('../api/server');

test('login route', async () => {
  const res = await supertest(server)
      .post('/api/auth/login')
      .send({ username: "joe", password: "123"});
    expect(res.statusCode).toBe(200);
    expect(res.type).toBe('text/html');
    expect(res.body.message).toMatch(/dad/i)
});

test('login route wrong password', async () => {
    const res = await supertest(server)
        .post('/api/auth/login')
        .send({ username: 'Bob', password: '555'});
    expect(res.statusCode).toBe(401);
    expect(res.body.errorMessage).toMatch(/invalid/i);
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
