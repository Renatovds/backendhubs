import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(login);
    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      } else {
        return null;
      }
    }
    return null;
  }
  async login(user: any) {
    const payload = { login: user.login, sub: user.userId };
    console.log(user);
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._doc._id,
        name: user._doc.name,
        login: user._doc.login,
        user_type: user._doc.user_type,
      },
    };
  }
}
