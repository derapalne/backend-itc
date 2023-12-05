import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  use(req: Request, res: Response, next: NextFunction) {
    // Get data from headers, decode it and add to request object
    const token = req.headers['authorization']?.split(' ')[1];
    // console.log(token);
    const decodedToken = this.jwtService.decode(token);
    // console.log(decodedToken);
    req.user = { userId: decodedToken?.sub };
    // console.log(req.user);
    next();
  }
}
