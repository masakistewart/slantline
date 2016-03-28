
exports.up = function(knex, Promise) {
  knex.schema.createTable('users', function(table) {
  	table.increments('id');
  	table.string('name');
  	table.string('password');
  	table.timestamp('created_at');
  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('users');
};
