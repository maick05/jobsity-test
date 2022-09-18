import * as crypto from 'crypto';
import { EnumBufferEncoding } from '../../domain/enum/buffer-encoding.enum';

export class RandomHelper {
  static GenerateHashString(lenght: number, encode: EnumBufferEncoding) {
    return crypto.randomBytes(lenght).toString(encode);
  }
}
