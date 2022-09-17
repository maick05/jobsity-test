import { User } from './../../schemas/user.schema';
import { RandomHelper } from './../../../adapter/helper/random.helper';
import { UsersMongooseRepository } from '../../../adapter/repository/user.repository';
import { Injectable } from '@nestjs/common';
import { AbstractAuthService } from './abstract-auth.service';
import { UserDTO } from '../../model/user.dto';
import { EnumBufferEncoding } from '../../enum/buffer-encoding.enum';
import { DTO } from '../../model/dto.model';

@Injectable()
export class RegisterUserService extends AbstractAuthService {
  constructor(protected readonly userRepository: UsersMongooseRepository) {
    super(userRepository);
  }

  async register(userDTO: UserDTO): Promise<UserResponse> {
    await this.validateUser(userDTO);
    const user = await this.createUserDB(userDTO);
    return {
      email: user.email,
      password: user.password
    };
  }

  private async validateUser(userDTO: UserDTO): Promise<void> {
    this.logger.log('Validating user...');
    DTO.ValidateIsAnyEmptyKey(userDTO);
    await this.validateUserExistsDB(userDTO);
  }

  private async createUserDB(userDTO: UserDTO): Promise<User> {
    this.logger.log('Creating user in database...');

    const password = RandomHelper.GenerateHashString(
      16,
      EnumBufferEncoding.HEX
    );

    const user = new User();
    user.email = userDTO.email;
    user.role = userDTO.role;
    user.password = this.generateUserHash(password);
    await this.userRepository.insertOne(user, 'User');
    return { ...user, password };
  }
}

export interface UserResponse {
  email: string;
  password: string;
}
