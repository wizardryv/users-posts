import { IsString, IsNotEmpty, IsOptional } from "class-validator"

export class UpdatePostDto{
    @IsOptional()
    @IsString({ message: 'Заголовок должен быть строкой' })
    @IsNotEmpty({ message: 'Заголовок не должен быть пустым' })
    title: string

    @IsOptional()
    @IsString({ message: 'Содержиание должно быть строкой' })
    @IsNotEmpty({ message: 'Содержание не должно быть пустым' })
    content: string
}