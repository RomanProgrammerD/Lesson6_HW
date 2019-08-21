import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';

@Injectable()
export class UsersGuard implements CanActivate{
    constructor(){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        console.log(user);
        console.log(user.role);
        if (user && (user.role === "ADMIN")){
            return await true;
        }
        throw await new HttpException('Wrong action!', 400);
    }
}