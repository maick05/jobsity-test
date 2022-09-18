import { RandomHelper } from './../../../../../src/microservice/adapter/helper/random.helper';
import { expect } from 'chai';
import { EnumBufferEncoding } from './../../../../../src/microservice/domain/enum/buffer-encoding.enum';

describe('RandomHelper', () => {
  describe('GenerateHashString', () => {
    it('Should call GenerateHashString and return a hash string', async () => {
      const actual = RandomHelper.GenerateHashString(
        12,
        EnumBufferEncoding.HEX
      );
      expect(actual.length).to.be.deep.equal(24);
    });
  });
});
