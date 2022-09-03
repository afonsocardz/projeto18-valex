import { Request, Response } from "express";
import { Payment } from "../repositories/paymentRepository";
import * as paymentService from "../services/paymentService"

async function createPayment(req:Request,res: Response){
  const {payment, password}: {payment: Payment, password: string} = req.body;
  await paymentService.createPayment(payment, password);
  res.sendStatus(200);
}

export {createPayment};