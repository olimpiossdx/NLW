import { Request, Response } from 'express';
import knex from '../database/connection';
import Iitem, { IitemView } from '../interfaces/Iitem';

class ItemsController {
  async index(request: Request, response: Response) {
    const items = await knex('items').select('*') as Iitem[];
    const serializedItems = items.map((item: Iitem) => {
      return {
        id: item.id,
        title: item.title,
        image: item.image,
        image_url: `http://localhost:3333/uploads/${item.image}`
      } as IitemView;
    });
    return response.json(serializedItems);
  }
};
export default ItemsController;