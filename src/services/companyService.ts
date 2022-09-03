import { Company } from "../repositories/companyRepository";
import * as companyRepository from "../repositories/companyRepository";

export async function isCompanyExists(key: string) {
  const company: Company | undefined = await companyRepository.findByApiKey(key);
  if (!company) {
    throw { type: 'notFound', message: 'Company not found' };
  }
}