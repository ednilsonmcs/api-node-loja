import Knex from 'knex';

export async function seed(knex: Knex){
    await knex('produtos').insert([
        {descricao: 'Boneco', status: 'AT'},
        {descricao: 'Carro', status: 'AT'},
        {descricao: 'Bate-bate', status: 'AT'},
        {descricao: 'Peão', status: 'AT'},
        {descricao: 'Moto', status: 'AT'},
        {descricao: 'Carro de Policia', status: 'AT'},
        {descricao: 'Barbie', status: 'AT'},
    ]);
}