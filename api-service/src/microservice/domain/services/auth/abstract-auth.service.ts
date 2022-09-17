import { UserAlreadyExistsException } from './../../../../core/error-handling/exception/user-already-exists.exception';
import { UsersMongooseRepository } from './../../../adapter/repository/user.repository';
import { AbstractService } from '../abstract.service';
import { User } from '../../schemas/user.schema';
import { UserDTO } from '../../model/user.dto';
import * as bcrypt from 'bcrypt';

export abstract class AbstractAuthService extends AbstractService {
  constructor(protected readonly userRepository: UsersMongooseRepository) {
    super();
  }

  async validateUserExistsDB(userDTO: UserDTO): Promise<User> {
    const res = await this.userRepository.findOne({
      email: userDTO.email
    });

    if (res) throw new UserAlreadyExistsException(userDTO.email);

    return res;
  }

  protected generateUserHash(value: string): string {
    const salt = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(value, salt);
  }

  protected validateUserPassword(
    password: string,
    passwordDB: string
  ): boolean {
    return bcrypt.compareSync(password, passwordDB);
  }
}
