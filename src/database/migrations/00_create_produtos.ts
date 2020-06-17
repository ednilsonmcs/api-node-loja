import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('produtos', table =>{
        table.increments('id').primary();
        table.string('descricao', 50).notNullable();
        table.string('status',2).notNullable();
        table.json('atributos');

    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('produtos');
}