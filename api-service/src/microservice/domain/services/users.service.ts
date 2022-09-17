import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersMongooseRepository } from './../../adapter/repository/user.repository';
import { Injectable } from '@nestjs/common';
import { User } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersMongooseRepository,
    private readonly jwtTokenService: JwtService,
    private configService: ConfigService
  ) {}
  async register(userDTO: User): Promise<TokenResponse> {
    await this.userRepository.insertOne(userDTO, 'User');
    return {
      token: await this.signToken(userDTO)
    };
  }

  async signToken(userDTO: User): Promise<string> {
    const payload = { email: userDTO.email, role: userDTO.role };
    return this.jwtTokenService.sign(payload, {
      secret: await this.configService.get('auth.jwt.secret')
    });
  }
}

export interface TokenResponse {
  token: string;
}
