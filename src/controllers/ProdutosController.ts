import {Request, Response} from 'express';
import knex from '../database/connection';

class ProdutosController {

    async index(req: Request, res: Response) {
        const { descricao, status, atributos} = req.query;
        const produtos = await knex('produtos')
            .where('descricao', String(descricao))
            .where('status', String(status))
            .distinct()
            .select('produtos.*');

        if(!produtos){
            return res.status(400).json({ message: 'Produto não encontrado'});
        }

        return res.json(produtos)
    }

    async show(req: Request, res: Response) {
        const { id } = req.params;

        const point = await knex('produtos').where('id', id).first();

        if(!point){
            return res.status(400).json({ message: 'Produto não encontrado'});
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.item_id', id)
            .select('items.title');

        return res.json({point, items});
    }

    async create(req: Request, res: Response) {
        const {
            descricao,
            status,
            atributos
        } = req.body;
    

        try  {
            const trx = await knex.transaction();
    
            const point = {
                descricao,
                status,
                atributos
            }
    
            const insertedIds = await trx('produtos').insert(point)
        
            const point_id = insertedIds[0];
    
            await trx.commit();
    
            return res.json({ 
                id: point_id,
                ...point
            });

          } catch(e) {
            return res.status(400).json({ message: e.sqlMessage});
          }
    }

}

export default ProdutosController;