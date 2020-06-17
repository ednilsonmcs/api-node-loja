import {Request, Response} from 'express';
import knex from '../database/connection';

class PedidosController {

    async index(req: Request, res: Response) {
        const { city, uf, itensPedido} = req.query;
        const parsedItems = String(itensPedido)
            .split(',')
            .map( item => Number(item.trim()));

        const pedidos = await knex('pedidos')
            .join('point_items', 'pedidos.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('pedidos.*');

        if(!pedidos){
            return res.status(400).json({ message: 'Point not found'});
        }

        return res.json(pedidos)
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const point = await knex('pedidos').where('id', id).first();

        if(!point){
            return res.status(400).json({ message: 'Point not found'});
        }

        const itensPedido = await knex('itensPedido')
            .join('point_items', 'itensPedido.id', '=', 'point_items.item_id')
            .where('point_items.item_id', id)
            .select('itensPedido.title');

        return res.json({point, itensPedido});
    }

    async create(req: Request, res: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            itensPedido
        } = req.body;
    
        const trx = await knex.transaction();
    
        const point = {
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const insertedIds = await trx('pedidos').insert(point)
    
        const point_id = insertedIds[0];
    
        const pointItems = itensPedido.map( (item_id: number) => {
            return {
                item_id,
                point_id,
            }
        })
    
        await trx('point_items').insert(pointItems);
    
        await trx.commit();

        return res.json({ 
            id: point_id,
            ...point
        });
    }

}

export default PedidosController;