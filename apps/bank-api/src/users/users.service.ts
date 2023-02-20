import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserEntity } from './user.entity';

/**
 * Write business logic here
 */
@Injectable()
export class UsersService extends InMemoryDBService<UserEntity> {
    constructor() {
        super( { featureName: 'users'});
        // mock some data for testing
        this.createMany([{
            id: '1',
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: 'password'
        }, {
            id: '2',
            name: 'Jane Doe',
            email: 'janedoe@example.com',
            password: 'password'
        }])
    }
    getAsync(id: string) {
        return super.getAsync(id)
    }

    getAllAsync(): Observable<UserEntity[]> {
        return super.getAllAsync();
    }
}
