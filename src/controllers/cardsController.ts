import { Request, Response } from "express";
import { Card } from "../repositories/cardRepository";
import * as cardService from '../services/cardsService';

async function createCard(req: Request, res: Response) {
  const card: Card = res.locals.card;
  const key: string = res.locals.key;
  await cardService.createCard(card, key);
  res.sendStatus(201);
}

async function activateCard(req: Request, res: Response) {
  const {id, password, securityCode}: any = req.body;
  await cardService.activateCard(id, password, securityCode);
  res.sendStatus(200);
}

export {createCard, activateCard};