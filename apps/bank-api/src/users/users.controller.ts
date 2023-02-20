import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    async getAll() {
        return this.usersService.getAllAsync();
    }
    @Get(':id')
    async get(@Param('id') id: string) {
        return this.usersService.getAsync(id);
    }
}
