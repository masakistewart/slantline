
exports.up = function(knex, Promise) {
  knex.schema.createTable('news', function(table) {
  	table.increments('id')
  	table.string('title')
  	table.text('summary')
  	table.string('source')
  	table.string('link')
  	table.timestamp('created_at')
  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('news')
};
