import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import Cryptr from 'cryptr';
import bcrypt from 'bcrypt';
import dayjs, { Dayjs } from 'dayjs';
import * as cardRepository from "../repositories/cardRepository";
import * as companyRepository from "../repositories/companyRepository";
import * as employeeRepository from "../repositories/employeeRepository";
import { Card } from "../repositories/cardRepository";
import { Company } from "../repositories/companyRepository";
import { Employee } from "../repositories/employeeRepository";

dotenv.config();

const SECRET: string | undefined = process.env.SECRET || 'banana';
const cryptr: Cryptr = new Cryptr(SECRET);

export async function activateCard(id: number, cardPassword: string, securityCode: string) {
  const card: Card = await isCardExists(id);
  isCardExpired(card);
  isPasswordValid(card);
  isSecurityCodeValid(card, securityCode);
  const password: string = preparePassword(cardPassword)
  await cardRepository.update(id, { password });
}

function isSecurityCodeValid(card: Card, securityCode:string){
  const decryptedCVC: string = cryptr.decrypt(card.securityCode);
  if (securityCode !== decryptedCVC) {
    throw { type: "notAuthorized" }
  }
}

function isPasswordValid(card:Card){
  if (card.password) {
    throw { type: "notAllowed", message: "Card is actived already" };
  }
}

function isCardExpired(card: Card){
  const cardDate = dayjs(`31/${card.expirationDate}`);
  const isExpired = dayjs().isAfter(cardDate)
  if (isExpired) {
    throw { type: "expired", message: "Card is expired" };
  }
}

async function isCardExists(id: number){
  const card: Card = await cardRepository.findById(id);
  if (!card) {
    throw { type: "notFound", message: "Card not found" };
  }
  return card;
}

function preparePassword(password: string) {
  if (password.length < 4) {
    throw { type: "notValid", message: "Must have 4 characters" };
  }
  const HASH_SALTS: number | undefined = Number(process.env.HASH_SALTS) || 10;
  return bcrypt.hashSync(password, HASH_SALTS);
}

export async function createCard(cardData: Card, key: string) {
  await isCompanyExists(key);
  await isCardDuplicated(cardData);
  const employee: Employee = await isEmployeeExists(cardData.employeeId)
  populateCardData(cardData, employee);
  await cardRepository.insert(cardData);
}

function populateCardData(cardData: Card, employee: Employee) {
  cardData.number = faker.finance.creditCardNumber();
  cardData.cardholderName = prepareName(employee);
  cardData.expirationDate = expirationDate();
  cardData.securityCode = prepareSecurityCode();
  cardData.isVirtual = false;
  cardData.isBlocked = true;
}

async function isCardDuplicated(cardData: Card) {
  const employeeCard: Card | undefined = await cardRepository.findByTypeAndEmployeeId(cardData.type, cardData.employeeId);
  if (employeeCard) {
    throw { type: 'duplicated', message: `Employee can't has card of same type` };
  }
}

async function isEmployeeExists(employeeId: number) {
  const employee: Employee | undefined = await employeeRepository.findById(employeeId);
  if (!employee) {
    throw { type: 'notFound', message: 'Employee not found' };
  }
  return employee;
}

async function isCompanyExists(key: string) {
  const company: Company | undefined = await companyRepository.findByApiKey(key);
  if (!company) {
    throw { type: 'notFound', message: 'Company not found' };
  }
}

function prepareSecurityCode() {
  const cvc: string = faker.finance.creditCardCVV();
  console.log(cvc);
  return cryptr.encrypt(cvc);
}

function expirationDate() {
  const date: string = dayjs().add(5, 'year').format('MM/YY');
  return date;
}

function prepareName({ fullName }: Employee) {
  const names: string[] = fullName.toUpperCase().split(' ');
  return filterMiddleNames(names);
};

function filterMiddleNames(names: string[]) {
  const newNames: Array<string> = [];
  for (let x = 0; x < names.length; x++) {
    if (x > 0 && x < names.length - 1) {
      if (names[x].length > 3)
        newNames.push(names[x].slice(0, 1));
    } else {
      newNames.push(names[x]);
    }
  }
  return newNames.join(' ');
}