import { IsEmail, IsNotEmpty } from 'class-validator';

interface Name {
    firstName: string;
    lastName: string;
}

export class ThirdPartyAuthDto {
    @IsNotEmpty()
    name: Name;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    provider: 'google' | 'facebook' | 'github';
}
