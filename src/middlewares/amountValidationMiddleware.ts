import {  NextFunction, Request, Response } from "express";
export function validateAmount(req: Request, res: Response, next: NextFunction) {
  const {amount} = req.body;
  if (amount <= 0){
    return res.sendStatus(422);
  }
  next();
}