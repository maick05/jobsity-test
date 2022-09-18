import { InvalidAuthenticationException } from './../../error-handling/exception/invalid-authentication.exception';
import { ForbiddenException } from './../../error-handling/exception/forbbiden-resource.exception';
import { EnumUserRole } from './../../../microservice/domain/enum/user-role.enum';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AbstractGuard } from '../guard/abstract-guard.guard';

@Injectable()
export class CustomJwtAuthGuard extends AbstractGuard {
  constructor(
    protected readonly reflector: Reflector,
    protected readonly jwtService: JwtService,
    protected readonly configService: ConfigService
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const bearerToken = this.getAuthToken(context, 'Bearer').replace(
      'Bearer ',
      ''
    );

    let tokenPayload = null;

    try {
      tokenPayload = await this.jwtService.verifyAsync(bearerToken, {
        secret: this.configService.get<string>('auth.jwt.secret'),
        ignoreExpiration: true
      });
    } catch (err) {
      throw new InvalidAuthenticationException(
        `Error validating token: ${err.message}`
      );
    }

    if (!tokenPayload)
      throw new InvalidAuthenticationException('Invalid Token');

    const role = this.reflector.get<string>('role', context.getHandler());

    if (!role || tokenPayload.role === EnumUserRole.ADMIN) return true;
    if (role !== tokenPayload.role) {
      throw new ForbiddenException(
        `Forbidden Resource, only the ${role} can do it.`
      );
    }
    return true;
  }
}
