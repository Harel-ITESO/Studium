import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from 'src/utils/hash.util';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';
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
     * Finds a user by a unique input
     * @param where Attributes to find on
     * @returns User found
     */
    public async getUserWhere(where: Prisma.UserWhereUniqueInput) {
        return await this.prismaService.user.findUnique({
            where,
        });
    }

    /**
     * Creates a user
     * @param data Data to insert to user
     * @returns User created
     */
    public async createUser(data: CreateUserDto) {
        if (data.password) {
            if (data.provider)
                throw new BadRequestException(
                    'Cannot create a user with password and provider',
                );
            const { password, ...rest } = data;
            const hashed = await hashPassword(password);
            return await this.prismaService.user.create({
                data: { ...rest, password: hashed },
            });
        }
        if (!data.provider)
            throw new BadRequestException(
                'Local users must have a password or auth provider',
            );
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
