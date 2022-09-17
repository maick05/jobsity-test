import { InvalidAuthenticationException } from './../../error-handling/exception/invalid-authentication.exception';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export abstract class AbstractGuard extends AuthGuard('jwt') {
  getAuthToken(context: Partial<ExecutionContext>, authType: string) {
    const request = context.switchToHttp().getRequest();

    if (!Object.keys(request.headers).includes('authorization'))
      throw new InvalidAuthenticationException('No Authentication Provided');

    if (request.headers.authorization.split(' ')[0] !== `${authType}`)
      throw new InvalidAuthenticationException(
        `Wrong Authentication Type. ${authType} Authentication is required`
      );

    return request.headers.authorization;
  }
}
