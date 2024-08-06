import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: 'Некорректный адрес электронной почты' })
    email: string;

    @IsString({ message: 'Пароль должен быть строкой' })
    @MinLength(parseInt(process.env.MIN_PASSWORD_LENGTH), { message: `Пароль должен содержать минимум ${process.env.MIN_PASSWORD_LENGTH} символов` })
    password: string;
}