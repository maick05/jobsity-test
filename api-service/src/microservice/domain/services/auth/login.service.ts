import { CustomErrorException } from './../../../../core/error-handling/exception/custom-error.exception';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersMongooseRepository } from '../../../adapter/repository/user.repository';
import { Injectable, HttpStatus } from '@nestjs/common';
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

  async login(userDTO: User): Promise<TokenResponse> {
    await this.validateUserExistsDB(userDTO);

    await this.userRepository.insertOne(userDTO, 'User');

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
}

export interface TokenResponse {
  email: string;
  token: string;
}
