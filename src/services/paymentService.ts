import { Business } from "../repositories/businessRepository";
import { Card, getCardBalance } from "../repositories/cardRepository";
import { Payment } from "../repositories/paymentRepository";
import * as cardService from '../services/cardsService';
import * as paymentRepository from "../repositories/paymentRepository";
import { isBusinessExists, validateCardType } from "./businessService";

export async function createPayment(payment: Payment, password: string){
  const card: Card = await cardService.isCardExists(payment.cardId);
  cardService.isCardActive(card);
  cardService.isCardExpired(card); 
  cardService.isCardBlocked(card.isBlocked);
  cardService.validatePassword(password, card.password);
  const business: Business = await isBusinessExists(payment.businessId);
  await validateCardType(card.type, business.type);
  await validateCardAmount(payment.amount, payment.cardId);
  await paymentRepository.insert(payment)
}

async function validateCardAmount(amount: number, id: number){
  const card = await getCardBalance(id);
  if(card.balance - amount < 0){
    throw {type: 'notAllowed', message: 'not sufficient amount'}
  }
}

