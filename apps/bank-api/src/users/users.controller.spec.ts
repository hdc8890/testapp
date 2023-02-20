import { Test, TestingModule } from '@nestjs/testing';
import { UserEntity } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
describe('UserController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of users', () => {
    expect(controller.getAll()).toBeInstanceOf(Promise<UserEntity[]>);
  });

  it('should return a single user', () => {
    expect(controller.get('1')).toBeInstanceOf(Object);
  });
});
