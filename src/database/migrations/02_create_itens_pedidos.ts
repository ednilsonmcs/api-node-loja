import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('itens_pedido', table =>{
        table.increments('id').primary();
        table.integer('id_produto').unsigned().index().references('id').inTable('produtos');
        table.integer('id_pedido').unsigned().index().references('id').inTable('pedidos');
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('itens_pedido');
}