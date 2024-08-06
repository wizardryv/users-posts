import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class PostOwnerGuard implements CanActivate{
    constructor(private readonly prisma: PrismaService){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const postId = +request.params.id;
        const currentUser = request.user;
        
        const post = await this.prisma.post.findUnique({
            where:{id: postId}
        });

        if(!post){
            throw new NotFoundException('Пост не был найден');
        }

        if(post.userId !== currentUser.id){
            throw new ForbiddenException('У вас недостаточно прав для доступа к этому ресурсу')
        }

        return true;
    }
}