import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './passwords/password.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly passwordsService: PasswordService
    ) { }

    async register(data: RegisterDto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existingUser) {
            throw new ConflictException('Пользователь с таким email уже существует');
        }

        const hashedPassword = await this.passwordsService.hashPassword(data.password);

        const user = await this.prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                role: data.role ? (data.role as Role) : Role.USER,
            },
            select: {
                email: true,
                role: true,
                createdAt: true
            }
        });

        return user;
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (user && await this.passwordsService.comparePasswords(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }

        return null;
    }

    async login(data: LoginDto): Promise<{ access_token: string }> {
        const user = await this.validateUser(data.email, data.password);
        if (!user) {
            throw new UnauthorizedException('Неверные данные.');
        }

        const payload = { sub: user.id };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}