import { NextFunction, Request, Response } from "express";
import { CardType } from "../schemas/Card";

function validateCard(req: Request, res: Response, next: NextFunction) {
  const key: string | undefined = req.headers.authorization;
  const card = req.body;
  if(!key){
    return res.sendStatus(401);
  }
  const {error} = CardType.validate(card.type);
  if(error){
    return res.sendStatus(422);
  }
  res.locals.card = card;
  res.locals.key = key.replace("Bearer ", '');
  next();
}

export {validateCard};