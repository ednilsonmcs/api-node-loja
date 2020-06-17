import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('pedidos', table =>{
        table.increments('id').primary();
        table.dateTime('data_realizacao').notNullable().defaultTo(knex.raw('now()'));
        table.string('forma_pagamento',2).notNullable();
        table.float('valor_total').notNullable();
        table.integer('numero_parcelas').notNullable();
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable('pedidos');
}