import configuration from '../../../src/configuration/configuration';

describe('configuration', () => {
  it('Should get the yaml value config correctly for api.port', async () => {
    const actual = await configuration();
    expect(actual.api.port).toBe(3002);
  });
});
