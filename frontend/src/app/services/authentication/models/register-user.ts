import { User } from '../../../shared/models/user';

export interface UserRegister extends User {
    doubleCheckPassword: string;
}
