import { RandomHelper } from '../../../adapter/helper/random.helper';
import { UsersMongooseRepository } from '../../../adapter/repository/user.repository';
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { EnumBufferEncoding } from '../../enum/buffer-encoding.enum';
import { AbstractAuthService } from './abstract-auth.service';

@Injectable()
export class GeneratePasswordService extends AbstractAuthService {
  constructor(protected readonly userRepository: UsersMongooseRepository) {
    super(userRepository);
  }

  private generateUserHash(value: string): string {
    const salt = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(value, salt);
  }

  generateUserPassword(): { password; hashPassword } {
    const password = RandomHelper.GenerateHashString(
      16,
      EnumBufferEncoding.HEX
    );

    const hashPassword = this.generateUserHash(password);

    return { password, hashPassword };
  }

  async resetPassword(email: string) {
    const userPassword = this.generateUserPassword();
    await this.userRepository.updatePassword(email, userPassword.hashPassword);
    return userPassword.password;
  }
}
