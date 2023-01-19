
exports.up = knex => knex.schema.createTable("links", table => {
  table.increments("id");
  table.text("url").notNullable();

  table.integer("note_id").references("id").inTable("notes").onDelete("CASCADE");//caso eu delete a nota, o cascade vai deletar as tags vinculadas a nota
  table.timestamp("created_at").default(knex.fn.now());

});

exports.down = knex => knex.schema.dropTable("links");
