import { Injectable } from '@nestjs/common';

import { UsersService } from './users/users.service';
@Injectable()
export class CreateDefaultUser {
    constructor(private readonly usersService: UsersService) {}

    async execute() {
        const user = await this.usersService.findOne('admin');
        if (!user) {
            const createdUser = await this.usersService.create({
                login: 'admin',
                password: 'infra2022',
                name: 'admin',
                user_type: 'admin',
            });
            console.log(createdUser);
        }
    }
}
