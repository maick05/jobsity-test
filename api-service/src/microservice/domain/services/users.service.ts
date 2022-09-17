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
    const userDb = await this.validateEmailDB(userDTO);

    if (!userDb) await this.userRepository.insertOne(userDTO, 'User');

    return {
      email: userDTO.email,
      token: await this.signToken(userDTO)
    };
  }

  private async signToken(userDTO: User): Promise<string> {
    const payload = { email: userDTO.email, role: userDTO.role };
    return this.jwtTokenService.sign(payload, {
      secret: await this.configService.get('auth.jwt.secret')
    });
  }

  async validateEmailDB(userDTO: User): Promise<boolean> {
    const res = await this.userRepository.findOne({
      email: userDTO.email,
      role: userDTO.role
    });
    return res;
  }
}

export interface TokenResponse {
  email: string;
  token: string;
}
