import { IsEmail, IsString, MinLength, IsOptional, IsIn } from 'class-validator';
import { Role } from '@prisma/client';

export class RegisterDto {
    @IsEmail({}, { message: 'Некорректный адрес электронной почты' })
    email: string;

    @IsString({ message: 'Пароль должен быть строкой' })
    @MinLength(parseInt(process.env.MIN_PASSWORD_LENGTH), { message: `Пароль должен содержать минимум ${process.env.MIN_PASSWORD_LENGTH} символов` })
    password: string;

    @IsOptional()
    @IsIn(Object.values(Role), { message: 'Неправильная роль.' })
    role?: string;
  }