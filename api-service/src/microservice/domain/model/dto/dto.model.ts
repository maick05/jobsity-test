import { EmptyPropException } from '../../../../core/error-handling/exception/empty-prop.exception';

export class DTO {
  static ValidateIsAnyEmptyKey(obj) {
    Object.keys(obj).forEach(function (key) {
      if (obj[key].length === 0) throw new EmptyPropException(key);
    });
  }
}
