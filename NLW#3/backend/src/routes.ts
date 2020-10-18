import { Router } from 'express';
import multer from 'multer';

import OrphanagesControlletr from '../src/controllers/OrphanagesController';
import uploadConfig from './config/upload';

const upload = multer(uploadConfig);
const routes = Router();

routes.get('/orphanages', OrphanagesControlletr.index);
routes.get('/orphanages/:id', OrphanagesControlletr.show);
routes.post('/orphanages', upload.array('images'), OrphanagesControlletr.create);

export default routes;