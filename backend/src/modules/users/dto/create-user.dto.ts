import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsOptional()
    password?: string;

    @IsNotEmpty()
    googleId?: string;
}
