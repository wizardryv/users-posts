import { IsEmail, isEmail, IsIn, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto{
    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @MinLength(parseInt(process.env.MIN_PASSWORD_LENGTH), { message: `Пароль должен содержать минимум ${process.env.MIN_PASSWORD_LENGTH} символов` })
    password: string;
}