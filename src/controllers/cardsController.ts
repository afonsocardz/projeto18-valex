import { Request, Response } from "express";
import { Card } from "../repositories/cardRepository";
import * as cardService from '../services/cardsService';

async function createCard(req: Request, res: Response) {
  const card: Card = res.locals.card;
  const key: string = res.locals.key;
  await cardService.createCard(card, key);
  res.sendStatus(201);
}

export {createCard};