import { User } from '@prisma/client';

export class JwtPayload {
    public id: number;
    public firstName: string;
    public lastName: string;
    public email: string;

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
