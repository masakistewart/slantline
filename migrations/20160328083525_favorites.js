
exports.up = function(knex, Promise) {
  return knex.schema.createTable('favorites', function(table) {
  	table.increments('favorites_id');
  	table.integer('user_id').unsigned().index().references('id').inTable('user');
  	table.integer('news_id').unsigned().index().references('id').inTable('news');
  	table.timestamp('favorited_at');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorites');
};
