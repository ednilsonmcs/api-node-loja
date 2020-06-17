import {Request, Response} from 'express';
import knex from '../database/connection';

class ItensPedidoController {
    async index(req: Request, res: Response) {
        const itensPedido = await knex('itensPedido').select('*');
        const serializedItems = itensPedido.map( itensPedido => {
            return {
                id: itensPedido.id,
                title: itensPedido.title,
                image_url: `http://192.168.1.2:3333/uploads/${itensPedido.image}`
            }
        })
        return res.json(serializedItems)
    }
}

export default ItensPedidoController;