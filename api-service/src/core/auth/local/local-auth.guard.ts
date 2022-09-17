import { ValidateUserService } from '../../../microservice/domain/service/auth/validate-user.service';
import { AuthenticatorExtractorHelper } from '../../../microservice/adapter/helper/authenticator-extractor.helper';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AbstractGuard } from '../guard/abstract-guard.guard';

@Injectable()
export class LocalAuthGuard extends AbstractGuard implements CanActivate {
  constructor(private readonly validateUserService: ValidateUserService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const tokenAuth = this.getAuthToken(context, 'Basic');

    const userAuth = AuthenticatorExtractorHelper.ExtractBasicAuth(tokenAuth);

    await this.validateUserService.validateUserByCredentials(userAuth);

    return true;
  }
}
