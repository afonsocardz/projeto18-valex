import { NextFunction, Request, Response } from "express";
import { CardType } from "../schemas/Card";

function validateCard(req: Request, res: Response, next: NextFunction) {
  const card = req.body;
  const {error} = CardType.validate(card.type);
  if(error){
    return res.sendStatus(422);
  }
  res.locals.card = card;
  next();
}

export {validateCard};