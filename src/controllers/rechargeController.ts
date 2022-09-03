import {  Request, Response } from "express";
import { Recharge } from "../repositories/rechargeRepository";
import * as rechargeService from "../services/rechargeService";

async function rechargeCard(req: Request, res: Response) {
  const recharge: Recharge = req.body;
  await rechargeService.recharge(recharge);
  res.sendStatus(200);
}

export {rechargeCard};