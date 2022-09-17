import { NotFoundException } from './../../../../core/error-handling/exception/not-found.exception';
import { InvalidCredentialsException } from '../../../../core/error-handling/exception/invalid-credentials.exception';
import { UserAlreadyExistsException } from '../../../../core/error-handling/exception/user-already-exists.exception';
import { UsersMongooseRepository } from '../../../adapter/repository/user.repository';
import { User } from '../../schema/user.schema';
import { CreateUserDTO } from '../../model/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { AbstractAuthService } from './abstract-auth.service';
import { LoginUserDTO } from '../../model/dto/login-user.dto';

export class ValidateUserService extends AbstractAuthService {
  constructor(protected readonly userRepository: UsersMongooseRepository) {
    super(userRepository);
  }

  async validateUserAlreadyExistsDB(userDTO: CreateUserDTO): Promise<User> {
    const res = await this.getUserByEmail(userDTO.email);
    if (res) throw new UserAlreadyExistsException(userDTO.email);

    return res;
  }

  async validateUserByCredentials(userDTO: LoginUserDTO): Promise<User> {
    const res = await this.getUserByEmail(userDTO.email);

    if (!res) throw new InvalidCredentialsException();

    if (!this.validateUserPassword(userDTO.password, res.password))
      throw new InvalidCredentialsException();

    return res;
  }

  protected validateUserPassword(
    password: string,
    passwordDB: string
  ): boolean {
    return bcrypt.compareSync(password, passwordDB);
  }

  async validateIfUserExistsDB(email: string): Promise<User> {
    const res = await this.getUserByEmail(email);
    if (!res) throw new NotFoundException(`User with '${email}'`);
    return res;
  }
}
