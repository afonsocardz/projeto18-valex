import { Card } from "../repositories/cardRepository";
import { Recharge } from "../repositories/rechargeRepository";
import * as cardService from "./cardsService";
import * as rechargeRepository from "../repositories/rechargeRepository";

export async function recharge(recharge: Recharge){
  const card: Card = await cardService.isCardExists(recharge.cardId);
  cardService.isCardActive(card);
  cardService.isCardExpired(card);
  await rechargeRepository.insert(recharge);
}

