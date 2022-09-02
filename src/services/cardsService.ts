import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
import Cryptr from 'cryptr';
import dayjs, { Dayjs } from 'dayjs';
import { Card, findByTypeAndEmployeeId, insert } from "../repositories/cardRepository";
import { Company, findByApiKey } from "../repositories/companyRepository";
import { Employee, findById } from "../repositories/employeeRepository";

dotenv.config();

export async function createCard(cardData: Card, key: string) {
  await isCompanyExists(key);
  await isCardDuplicated(cardData);
  const employee: Employee = await isEmployeeExists(cardData.employeeId)
  populateCardData(cardData, employee);
  await insert(cardData);
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
  const employeeCard: Card | undefined = await findByTypeAndEmployeeId(cardData.type, cardData.employeeId);
  if (employeeCard) {
    throw { type: 'duplicated', message: `Employee can't has card of same type` };
  }
}

async function isEmployeeExists(employeeId: number) {
  const employee: Employee | undefined = await findById(employeeId);
  if (!employee) {
    throw { type: 'notFound', message: 'Employee not found' };
  }
  return employee;
}

async function isCompanyExists(key: string) {
  const company: Company | undefined = await findByApiKey(key);
  if (!company) {
    throw { type: 'notFound', message: 'Company not found' };
  }
}


function prepareSecurityCode() {
  const SECRET: string | undefined = process.env.SECRET || 'banana';
  const cryptr: Cryptr = new Cryptr(SECRET);
  const cvc: string = faker.finance.creditCardCVV();
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