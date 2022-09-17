import { ValidateUserService } from './validate-user.service';
import { User } from '../../schema/user.schema';
import { RandomHelper } from '../../../adapter/helper/random.helper';
import { UsersMongooseRepository } from '../../../adapter/repository/user.repository';
import { Injectable } from '@nestjs/common';
import { AbstractAuthService } from './abstract-auth.service';
import { CreateUserDTO } from '../../model/dto/create-user.dto';
import { EnumBufferEncoding } from '../../enum/buffer-encoding.enum';
import { DTO } from '../../model/dto/dto.model';

@Injectable()
export class RegisterUserService extends AbstractAuthService {
  constructor(
    protected readonly userRepository: UsersMongooseRepository,
    protected readonly validateUserService: ValidateUserService
  ) {
    super(userRepository);
  }

  async register(userDTO: CreateUserDTO): Promise<UserResponse> {
    await this.validateUser(userDTO);
    const user = await this.createUserDB(userDTO);
    return {
      email: user.email,
      password: user.password
    };
  }

  private async validateUser(userDTO: CreateUserDTO): Promise<void> {
    this.logger.log('Validating user...');
    DTO.ValidateIsAnyEmptyKey(userDTO);
    await this.validateUserService.validateUserExistsDB(userDTO);
  }

  private async createUserDB(userDTO: CreateUserDTO): Promise<User> {
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
