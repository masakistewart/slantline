
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
  	table.increments('id');
  	table.string('name');
  	table.string('password');
  	table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};