const { hash } = require('bcryptjs');
const db = require('../database/dbConfig');

module.exports = {
    add,
    findBy,
    findById
};

async function add(user) {
    user.password = await hash(user.password, 14);
    const [ id ] = await db('users').insert(user);
    return findById(id)
}

function findById(id) {
    return db('users')
        .select('id', 'username')
        .where('id', id)
        .first()
}

function findBy(filter) {
    return db('users')
        .select('id', 'username', 'password')
        .where(filter);
}
