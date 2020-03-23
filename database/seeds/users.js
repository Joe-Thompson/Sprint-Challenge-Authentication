exports.seed = async function(knex) {
  await knex('users').truncate();
  await knex('users').insert([
    {username: 'joe', password: '123'},
    {username: 'katie', password: '123'}
  ])
};
