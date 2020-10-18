import express, { Request, Response } from 'express';
import 'express-async-errors';
import path from 'path';
import './database/connection';
import errorHandler from './erros/handler';
import cors from 'cors';

import routes from './routes';


const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use(errorHandler);

app.get('/', (_request: Request, response: Response) => {
  return response.send(`Api Happy ${new Date()}`);
});

app.listen(3333);