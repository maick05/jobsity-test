import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersMongooseRepository } from '../../../adapter/repository/user.repository';
import { Injectable } from '@nestjs/common';
import { User } from '../../schema/user.schema';
import { AbstractAuthService } from './abstract-auth.service';
import { LoginUserDTO } from '../../model/dto/login-user.dto';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class LoginService extends AbstractAuthService {
  constructor(
    protected readonly userRepository: UsersMongooseRepository,
    private readonly jwtTokenService: JwtService,
    private configService: ConfigService
  ) {
    super(userRepository);
  }

  async login(user: LoginUserDTO): Promise<TokenResponse> {
    const userDB = await this.getUserByEmail(user.email);
    return {
      token: await this.signToken(userDB)
    };
  }

  private async signToken(user: User): Promise<string> {
    const payload = { email: user.email, role: user.role };
    return this.jwtTokenService.sign(payload, {
      secret: await this.configService.get('auth.jwt.secret')
    });
  }
}

export class TokenResponse {
  @ApiProperty({
    type: String,
    description: `JWT Token`,
    example: 'any_jwt_token'
  })
  token: string;
}
