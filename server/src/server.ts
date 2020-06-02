import express, { Request, Response } from 'express';

const app = express();
app.listen(3333, () => console.log('aplicação inicializada'));
app.get('/users', (request: Request, response: Response) => response.json(['usuario 1', 'usuario 2','usuario 3']));