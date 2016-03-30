
exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(table) {
  	table.increments('comments_id');
  	table.integer('user_id');
  	table.integer('news_id');
  	table.text('comment')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('comments');
};
