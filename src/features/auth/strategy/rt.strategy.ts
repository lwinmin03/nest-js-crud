import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.['refresh_token'],
      ]),
      secretOrKey: 'super',
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    const refresh_token = req.cookies['refresh_token'];
    return { ...payload, refresh_token };
  }
}
