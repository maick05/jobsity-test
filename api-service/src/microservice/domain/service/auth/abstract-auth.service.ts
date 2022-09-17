import { UsersMongooseRepository } from '../../../adapter/repository/user.repository';
import { AbstractService } from '../abstract.service';
import { User } from '../../schema/user.schema';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class AbstractAuthService extends AbstractService {
  constructor(protected readonly userRepository: UsersMongooseRepository) {
    super();
  }

  protected async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      email
    });
  }

  protected generateUserHash(value: string): string {
    const salt = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(value, salt);
  }
}
