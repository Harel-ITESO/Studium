import { IsOptional } from 'class-validator';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class RegisterUserDto extends CreateUserDto {
    @IsOptional()
    doubleCheckPassword?: string;
}
