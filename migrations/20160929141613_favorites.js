
exports.up = function(knex, Promise) {
  return knex.schema.createTable('favorites',function(table){
  	table.increments('id');
  	table.integer('user_id').unsigned();
  	table.foreign('user_id').references('users.id');
  	table.integer('news_id').unsigned();
  	table.foreign('news_id').references('news.id');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorites');
};
