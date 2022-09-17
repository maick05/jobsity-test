import { UserAlreadyExistsException } from './../../../../core/error-handling/exception/user-already-exists.exception';
import { UsersMongooseRepository } from './../../../adapter/repository/user.repository';
import { AbstractService } from '../abstract.service';
import { User } from '../../schemas/user.schema';
import { UserDTO } from '../../model/user.dto';

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
}
