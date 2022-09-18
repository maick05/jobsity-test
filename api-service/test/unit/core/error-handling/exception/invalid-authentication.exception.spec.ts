import { InvalidAuthenticationException } from './../../../../../src/core/error-handling/exception/invalid-authentication.exception';
import { expect } from 'chai';
import { HttpStatus } from '@nestjs/common';

describe('InvalidAuthenticationException', () => {
  it('Should instanciate InvalidAuthenticationException correctly', async () => {
    const actual = new InvalidAuthenticationException('any message');
    expect(actual.message).to.be.deep.equal('any message');
    expect(actual.getStatus()).to.be.deep.equal(HttpStatus.UNAUTHORIZED);
    expect(actual.errCode).to.be.deep.equal(HttpStatus.UNAUTHORIZED);
  });
});
