exports.up = function(knex, Promise) {
  return knex.schema.createTable("categories", categories => {
    categories.increments("category_id");

    categories.string("category_name").notNullable();
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTableIfExists("categories");
};
