import { Request, Response } from 'express';
import { Card } from '../models/card';

export const addCard = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const card = await Card.create({ name, description });
  res.status(201).send(card);
};

export const deleteCard = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Card.destroy({ where: { id } });
  res.send({ message: 'Card deleted' });
};
