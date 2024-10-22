import { User } from '@prisma/client';

export class JwtPayload {
    private id: number;
    private firstName: string;
    private lastName: string;
    private email: string;

    private constructor({ id, firstName, lastName, email }: User) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    public static fromUser(user: User) {
        return new JwtPayload(user);
    }
}
