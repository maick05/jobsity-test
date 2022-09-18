import { MongooseHelper } from './../../../../../src/microservice/adapter/helper/mongoose.helper';

describe('MongooseHelper', () => {
  describe('buildSelectAggregated', () => {
    it('should call buildSelectAggregated', async () => {
      const actual = MongooseHelper.buildSelectAggregated({ any: '$any' });
      expect(actual).toBeDefined();
    });

    it('should call buildSelectAggregated with default params', async () => {
      const actual = MongooseHelper.buildSelectAggregated();
      expect(JSON.stringify(actual)).toBe('{}');
    });
  });
});
