const supertest = require('supertest');
const server = require('../api/server');
const jwt = require('jsonwebtoken');

// let token;
//
// beforeEach(async (req, res) => {
//     try {
//         await supertest(server)
//             .post('/api/auth/login')
//             .send({
//                 username: 'joe',
//                 password: '123',
//             });
//        return token = res.token;
//     } catch (e) {
//         console.log(e);
//     }
// });


test('jokes token not verified', async () => {
   const res = await supertest(server)
       .get('/api/jokes');
    expect(res.statusCode).toBe(401);
});

// test('jokes not logged in', async () => {
//    const res = await supertest(server)
//        .get('/api/jokes')
//        .set('Cookie', token);
//     expect(res.statusCode).toBe(401);
//     expect(res.message).toMatch(/you/i);
// });

test('jokes return data', async () => {
   const res = await supertest(server)
       .get('/api/auth/jokes');
    expect(res.type).toBe('text/html');
});
