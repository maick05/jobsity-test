import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersMongooseRepository } from '../../../adapter/repository/user.repository';
import { Injectable } from '@nestjs/common';
import { User } from '../../schemas/user.schema';
import { AbstractAuthService } from './abstract-auth.service';

@Injectable()
export class LoginService extends AbstractAuthService {
  constructor(
    protected readonly userRepository: UsersMongooseRepository,
    private readonly jwtTokenService: JwtService,
    private configService: ConfigService
  ) {
    super(userRepository);
  }

  async login(user: User): Promise<TokenResponse> {
    return {
      token: await this.signToken(user)
    };
  }

  private async signToken(user: User): Promise<string> {
    const payload = { email: user.email, role: user.role };
    return this.jwtTokenService.sign(payload, {
      secret: await this.configService.get('auth.jwt.secret')
    });
  }
}

export interface TokenResponse {
  token: string;
}
