import { AuthenticatorExtractorHelper } from './../../../../../src/microservice/adapter/helper/authenticator-extractor.helper';
import { expect } from 'chai';

describe('AuthenticatorExtractorHelper', () => {
  describe('ExtractBearerTokenAuth', () => {
    it('Should call ExtractBearerTokenAuth and return a correct payload', async () => {
      const fakeToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFueV9lbWFpbCIsInJvbGUiOiJ1c2VyIn0.byh-Da3s8Nuo463TbX-i8KX90LDYohQ2unNKzuheVCE';
      const actual =
        AuthenticatorExtractorHelper.ExtractBearerTokenAuth(fakeToken);
      expect(actual.email).to.be.deep.equal('any_email');
      expect(actual.role).to.be.deep.equal('user');
    });
  });
});
