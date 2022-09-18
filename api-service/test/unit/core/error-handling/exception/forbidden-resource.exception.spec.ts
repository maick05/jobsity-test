import { ForbiddenException } from './../../../../../src/core/error-handling/exception/forbbiden-resource.exception';
import { expect } from 'chai';
import { HttpStatus } from '@nestjs/common';

describe('ForbiddenException', () => {
  it('Should instanciate ForbiddenException correctly', async () => {
    const actual = new ForbiddenException('any message');
    expect(actual.message).to.be.deep.equal('any message');
    expect(actual.getStatus()).to.be.deep.equal(HttpStatus.FORBIDDEN);
    expect(actual.errCode).to.be.deep.equal(HttpStatus.FORBIDDEN);
    expect(actual.type).to.be.deep.equal('ForbiddenException');
  });
});
