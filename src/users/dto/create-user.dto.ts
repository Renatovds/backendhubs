export class CreateUserDto {
    name: string;
    login: string;
    password: string;
    user_type: 'user' | 'admin';
}
