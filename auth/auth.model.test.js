const helpers = require('./authModel');
const db = require('../database/dbConfig');

beforeEach(async () => {
    await db.seed.run()
});

afterAll(async () => {
    await db.destroy()
});

test('add a new user', async () => {
   const res = await helpers.add({
       username: 'becky',
       password: '159'
   });
   expect(res.username).toBe('becky');
});

test('find user by id', async () => {
   const res = await helpers.findById(1);
   expect(res.username).toBe('joe')
});

test('find by username', async () => {
    const user = {
        username: 'joe'
    };
   const res = await helpers.findBy(user).first();
   console.log(res);
   expect(res.username).toBe('joe');
   expect(res.password).toBe('123');
   expect(res.id).toBe(1);
});
