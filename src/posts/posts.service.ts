import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PrismaService } from 'src/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UpdatePostDto } from './dto/update-post-dto';

@Injectable()
export class PostsService {
    constructor(private readonly prisma: PrismaService) { }

    async createOne(createPostDto: CreatePostDto, userId: number) {
        return this.prisma.post.create({
            data: {
                title: createPostDto.title,
                content: createPostDto.content,
                userId
            }
        });
    }

    async findAll(offset: number = 0, limit: number = 100, filter?: string) {
        const where = filter ? {title: {contains: filter}}:{};

        const [totalCount, posts] = await Promise.all([
            this.prisma.post.count({where}),
            this.prisma.post.findMany({
                skip: offset,
                take: limit,
                where
            }),
        ]);

        return {
            data: posts,
            totalCount,
            offset,
            limit
        };
    }

    async findOne(id: number) {
        const post = await this.prisma.post.findUnique({
            where: { id }
        });

        if (!post) {
            throw new NotFoundException({ message: "Пост не был найден" });
        }

        return post;
    }

    async deleteOne(id: number) {
        return this.prisma.post.delete({
            where: { id }
        });
    }

    async updateOne(id: number, updatePostDto: UpdatePostDto){
        try {
            return this.prisma.post.update({
                where: { id },
                data: updatePostDto,
            });
        } catch (error) {
            if (error.code === 'P2025') { // Код ошибки в Prisma для записи, которая не найдена
                throw new NotFoundException('Пост не был найден');
            }
            throw error;
        }
    }
}
