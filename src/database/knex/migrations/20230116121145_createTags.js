
exports.up = knex => knex.schema.createTable("tags", table => {
  table.increments("id");
  table.text("name").notNullable();

  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");//caso eu delete a nota, o cascade vai deletar as tags vinculadas a nota
  table.integer("user_id").references("id").inTable("users");

});

exports.down = knex => knex.schema.dropTable("tags");
