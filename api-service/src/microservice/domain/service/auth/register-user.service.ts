import { ValidateUserService } from './validate-user.service';
import { User } from '../../schema/user.schema';
import { UsersMongooseRepository } from '../../../adapter/repository/user.repository';
import { Injectable } from '@nestjs/common';
import { AbstractAuthService } from './abstract-auth.service';
import { CreateUserDTO } from '../../model/dto/create-user.dto';
import { DTO } from '../../model/dto/dto.model';
import { GeneratePasswordService } from './generate-password.service';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class RegisterUserService extends AbstractAuthService {
  constructor(
    protected readonly userRepository: UsersMongooseRepository,
    protected readonly validateUserService: ValidateUserService,
    protected readonly generatePasswordService: GeneratePasswordService
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
    await this.validateUserService.validateUserAlreadyExistsDB(userDTO);
  }

  private async createUserDB(userDTO: CreateUserDTO): Promise<User> {
    this.logger.log('Creating user in database...');

    const user = new User();
    user.email = userDTO.email;
    user.role = userDTO.role;
    const userPassword = this.generatePasswordService.generateUserPassword();
    user.password = userPassword.hashPassword;
    await this.userRepository.insertOne(user, 'User');
    return { ...user, password: userPassword.password };
  }
}

export class UserResponse {
  @ApiProperty({
    type: String,
    description: `User email`,
    example: 'jobsity@email.com'
  })
  email: string;

  @ApiProperty({
    type: String,
    description: `User password`,
    example: 'any_password'
  })
  password: string;
}
