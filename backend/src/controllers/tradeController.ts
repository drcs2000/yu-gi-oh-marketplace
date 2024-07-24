import { Request, Response } from 'express';
import { Trade } from '../models/trade';

export const createTrade = async (req: Request, res: Response) => {
  const { requesterId, requestedId } = req.body;
  const trade = await Trade.create({ requesterId, requestedId });
  res.status(201).send(trade);
};

export const deleteTrade = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Trade.destroy({ where: { id } });
  res.send({ message: 'Trade deleted' });
};

export const acceptTrade = async (req: Request, res: Response) => {
  const { id } = req.params;
  const trade = await Trade.findByPk(id);
  trade.status = 'accepted';
  await trade.save();
  res.send(trade);
};
