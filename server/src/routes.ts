import express, { Request, Response } from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.index);

routes.post('/points', pointsController.create);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.get('/users', (request: Request, response: Response) => response.json(['usuario 1', 'usuario 2', 'usuario 3']));

export default routes;
