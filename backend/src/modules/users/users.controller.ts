import {
    Controller,
    Param,
    ParseIntPipe,
    Get,
    NotFoundException,
    Put,
    Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    /** GET - /studium/api/users/:id */
    @Get(':id')
    public async getUserById(@Param('id', ParseIntPipe) id: number) {
        const data = await this.usersService.getUserById(id);
        if (!data) throw new NotFoundException('User was not found');
        return data;
    }

    /** PUT - /studium/api/users/:id */
    @Put(':id')
    public async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body('data') data: UpdateUserDto,
    ) {
        const updated = this.usersService.updateUserById(id, data);
        if (!updated)
            throw new NotFoundException('Not found the user to update');
        return updated;
    }
}
