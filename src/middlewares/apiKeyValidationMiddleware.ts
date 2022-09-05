import { NextFunction, Request, Response } from "express";

function validateKey(req: Request, res: Response, next: NextFunction) {
  const key: string | undefined = req.headers["x-api-key"].toString();
  
  if(!key){
    return res.sendStatus(401);
  }
  res.locals.key = key;
  next();
}

export {validateKey};