import {Request, Response, NextFunction} from "express"
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
  const authToken  = request.headers.authorization;
  
  if(!authToken){
    return response.status(401).end();
  }

  const token = authToken.split(" ")[1];

  try {
    const { sub } = verify(token, "1171cc284f1d008aa16c16e3e994b157") as IPayload;

    request.user_id = sub;

    return next();
  } catch (error) {
    return response.status(401).end();
  }
}