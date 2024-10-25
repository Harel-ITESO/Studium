import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { RegisterUserDto } from '../../auth/dto/register-user.dto';

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

    @IsOptional()
    provider?: 'google' | 'facebook' | 'github';

    public static fromRegisterData(data: RegisterUserDto) {
        const user = new CreateUserDto();
        user.email = data.email;
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.password = data.password;
        return user;
    }
}
