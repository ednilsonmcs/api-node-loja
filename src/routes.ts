import express from 'express';
import ProdutosController from './controllers/ProdutosController';
import ItensPedidoController from './controllers/ItensPedidoController';

const routes = express.Router();

const produtosController = new ProdutosController();
const itensPedidoController = new ItensPedidoController();

routes.get('/', (req, res) => { res.json({message: 'Bem vindo!'})});

routes.get('/itensPedido', itensPedidoController.index);

routes.post('/produtos', produtosController.create);
routes.get('/produtos', produtosController.index);
routes.get('/produtos/:id', produtosController.show);

export default routes;