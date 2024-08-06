import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PasswordService } from 'src/auth/passwords/password.service';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly passwordsService: PasswordService
    ) { }

    async findAll(offset: number = 0, limit: number = 100, filter?: string) {
        const where = filter ? {email: {contains: filter}}:{};

        const [totalCount, users] = await Promise.all([
            this.prisma.user.count({where}),
            this.prisma.user.findMany({
                skip: offset,
                take: limit,
                where,
                select:{
                    id: true,
                    email: true,
                    role: true,
                    createdAt: true
                },
            }),
        ]);

        return {
            data: users,
            totalCount,
            offset,
            limit
        };
    }

    async findOne(id: number) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                role: true,
                createdAt: true
            }
        });

        if (!user) {
            throw new NotFoundException('Пользователь не был найден');
        }

        return user;
    }

    async deleteOne(id: number) {
        try {
            const deletedUser = await this.prisma.user.delete({
                where: { id },
                select: {
                    id: true,
                    email: true,
                    role: true,
                    createdAt: true,
                },
            });

            return deletedUser;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') { // Код ошибки в Prisma для записи, которая не найдена
                throw new NotFoundException('Пользователь не был найден');
            }
            throw error;

        }
    }

    async updateOne(id: number, updateUserDto: UpdateUserDto) {
        try {
            return await this.prisma.user.update({
                where: { id },
                data: updateUserDto,
            });
        } catch (error) {
            if (error.code === 'P2025') { // Код ошибки в Prisma для записи, которая не найдена
                throw new NotFoundException('Пользователь не был найден');
            }
            if (error.code === 'P2002') { // Код ошибки уникальности в Prisma
                throw new ConflictException('Пользователь с данной почтой уже существует');
            }
            throw error;
        }
    }
}