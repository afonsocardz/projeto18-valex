import { Request, Response } from "express";
import { Card } from "../repositories/cardRepository";
import * as cardService from '../services/cardsService';

async function blockCard(req: Request, res: Response) {
  const {id, password}: any = req.body;
  await cardService.blockCard(id, password);
  res.sendStatus(200);
}

async function unblockCard(req: Request, res: Response) {
  const {id, password}: any = req.body;
  await cardService.unblockCard(id, password);
  res.sendStatus(200);
}

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

async function getCardBalance(req: Request, res: Response) {
  const {id} = req.params;
  const cardBalance = await cardService.getCardBalance(Number(id));
  res.status(200).send(cardBalance);
}

export {createCard, activateCard, blockCard, unblockCard, getCardBalance};