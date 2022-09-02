import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

async function errorHandler(error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
  res.status(500).send(error);
}

export default errorHandler;