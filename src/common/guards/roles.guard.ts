import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { jwtConstants } from '../../auth/constants';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private readonly authService: AuthService){}
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean| never>{

        const request = context.switchToHttp().getRequest();
        const authToken = request.headers.authorization;
        console.log('authToken', authToken)
        try{
            const token = await jwt.verify(authToken, jwtConstants.secret);
            console.log('token', token);
            request.user = token;
            return true;
        }
        catch(err){
            console.log(err);
            return false;
        }
    }
}