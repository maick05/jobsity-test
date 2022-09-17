export class MongooseHelper {
  static buildSelectAggregated(groupSelect: object = {}) {
    const objGroup = {};
    if (Object.keys(groupSelect).length > 0) {
      Object.keys(groupSelect).forEach((key) => {
        objGroup[key] = {
          $first: `$${groupSelect[key]}`
        };
      });
    }
    return objGroup;
  }
}
