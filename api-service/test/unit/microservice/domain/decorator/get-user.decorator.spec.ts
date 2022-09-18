import { GetUser } from './../../../../../src/microservice/domain/decorator/get-user.decorator';
describe('GetUser Decorator', () => {
  it('@GetUser', () => {
    const factory = GetUser();
    expect(factory({}, 'any', 0)).toBeUndefined();
  });
});
