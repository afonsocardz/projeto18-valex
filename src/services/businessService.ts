import * as businessRepository from '../repositories/businessRepository';
import { Business } from "../repositories/businessRepository";

export async function isBusinessExists(id: number){
  const business: Business = await businessRepository.findById(id);
  if (!business){
    throw {type: 'notFound', message: 'Business not found'};
  }
  return business;
}

export async function validateCardType(type: string, businessType: string){
  if(type !== businessType){
    throw {type: 'notValid', message:'Invalid card type'};
  }
}