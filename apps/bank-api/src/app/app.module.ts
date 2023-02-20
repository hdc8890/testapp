import { Module } from '@nestjs/common';
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { UsersController } from '../users/users.controller';
import { AccountsController } from '../accounts/accounts.controller';
import { AccountsService } from '../accounts/accounts.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [InMemoryDBModule],
  controllers: [UsersController, AccountsController],
  providers: [AccountsService, UsersService],
})
export class AppModule {
  // TODO implement middleware to handle authentication.
}
