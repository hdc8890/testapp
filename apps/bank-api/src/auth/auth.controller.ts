import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '../users/user.entity';
import { UserDTO } from '../users/users.interface';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
    constructor(private userService: UsersService) { }
    @Post('signin')
    signIn(@Body() body: UserDTO) {
        const user = this.userService.query((user:UserEntity) => user.email === body.email && user.password === body.password)[0];
        if (!user) {
            throw new UnauthorizedException();
        }
        return {
            email: user.email,
            token: 'someJWTToken',
            expiry: 123,
            refreshToken: 'refreshToken',
        }
    }
}
