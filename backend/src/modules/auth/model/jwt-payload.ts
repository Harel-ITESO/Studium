import { User } from '@prisma/client';

export class JwtPayload {
    id: number;
    firstName: string;
    lastName: string;
    email: string;

    constructor({ id, firstName, lastName, email }: User) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
}
