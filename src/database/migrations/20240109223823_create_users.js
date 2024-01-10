/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.specificType('id', 'char(24)').primary();
    table.string('display', 64).notNullable();
    table.string('username', 64).notNullable().unique();
    table.string('email', 92).notNullable().unique();
    table.string('password', 64).notNullable();
    table.specificType('control', 'char(1)').defaultTo('A');
    table.timestamp('created_at', { useTz: false }).defaultTo(knex.fn.now()).notNullable();
    table.timestamp('updated_at', { useTz: false });
    table.timestamp('deleted_at', { useTz: false });
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
function down(knex) {
  return knex.schema.dropTable('users');
}

module.exports = { up, down };
