module.exports = {
    client: 'mysql',
    connection: {
        host : '127.0.0.1',
        user : 'root',
        password : '32312095',
        database : 'loja'
      },
    migrations: {
        directory: process.cwd() + '/src/database/migrations'
    },
    seeds: {
        directory: process.cwd() + '/src/database/seeds'
    },
    useNullAsDefault: true,
}


//Executando as migrations: npx knex migrate:latest --knexfile knexfile.ts migrate:latest