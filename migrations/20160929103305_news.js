
exports.up = function(knex, Promise) {
  return knex.schema.createTable('news', function(table){
  	table.increments('id');
  	table.string('title');
  	table.text('summary');
  	table.string('source');
  	table.string('link');
  	table.timestamps();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('news');
};
