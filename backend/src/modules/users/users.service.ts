import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from 'src/utils/hash.util';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) {}

    /**
     * Gets a single user by his ID
     * @param id The id of the user to look after
     * @returns User if found
     */
    public async getUserById(id: number) {
        return await this.prismaService.user.findUnique({
            where: {
                id,
            },
        });
    }

    /**
     * Creates a user
     * @param data Data to insert to user
     * @returns User created
     */
    public async createUser(data: CreateUserDto) {
        if (data.password) {
            const { password, ...rest } = data;
            const hashed = await hashPassword(password);
            return await this.prismaService.user.create({
                data: { ...rest, password: hashed },
            });
        }
        return await this.prismaService.user.create({
            data,
        });
    }

    /**
     * Updates a user by his given id
     * @param id The id of the user to update
     * @param data The data for update
     */
    public async updateUserById(id: number, data: UpdateUserDto) {
        return await this.prismaService.user.update({
            where: {
                id,
            },
            data,
        });
    }
}
