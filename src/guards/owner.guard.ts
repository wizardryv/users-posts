import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";

@Injectable()
export class OwnerGuard implements CanActivate{
    constructor(){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const userId = +request.params.id;
        const currentUser = request.user;
        
        if(userId !== currentUser.id){
            throw new ForbiddenException('У вас недостаточно прав для доступа к этому ресурсу')
        }

        return true;
    }
}