

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

interface CustomRequest extends Request {
  userId?: string;
}

interface TokenPayload {
  userId: string;
}

export const UserMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string, JWT_SECRET) as TokenPayload;
    if(decoded){
        req.userId = decoded.userId;
        next();
    }else {
        res.status(403).json({
            message: "Unathorized "
        })
    }

}