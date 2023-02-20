import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AccountDTO } from './account.interface';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
    constructor(private readonly accountsService: AccountsService) {}

    @Get()
    async getAll() {
        return this.accountsService.getAllAsync();
    }
    @Get(':id')
    async get(@Param('id') id: string) {
        return this.accountsService.getAsync(id);
    }
    @Post()
    async create(@Body() body: Partial<AccountDTO>) {
        return this.accountsService.createAsync(body);
    }
    @Patch(':id')
    async update(@Param('id') id: string, @Body() body: Partial<AccountDTO>) {
        return this.accountsService.updateOne(body);
    }
    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.accountsService.deleteAsync(id);
    }
}
