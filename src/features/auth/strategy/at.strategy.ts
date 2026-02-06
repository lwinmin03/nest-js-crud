import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => {
                    let token = null;
                    
                    // 1. Check signedCookies first (because you used signed: true)
                    if (req && req.signedCookies) {
                        token = req.signedCookies['access_token'];
                        console.log("ST",token);
                        
                    }
                    
                    // 2. Fallback to normal cookies (optional, good for debugging)
                    if (!token && req && req.cookies) {
                        token = req.cookies['access_token'];
                    }

                    return token;
                }
            ]),
            secretOrKey: "superkey", // Ensure this matches your token generation secret
            ignoreExpiration: false
        })
    }

    validate(payload:any) {
        return payload
    }
}