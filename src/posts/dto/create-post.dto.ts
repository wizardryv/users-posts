import { IsNotEmpty, IsString } from "class-validator"

export class CreatePostDto{
    @IsString({ message: 'Заголовок должен быть строкой' })
    @IsNotEmpty({ message: 'Заголовок не должен быть пустым' })
    title: string

    @IsString({ message: 'Содержиание должно быть строкой' })
    @IsNotEmpty({ message: 'Содержание не должно быть пустым' })
    content: string
}