import { MongooseHelper } from './../../adapter/helper/mongoose.helper';
import { MongoDBException } from './../../../core/error-handling/exception/mongodb.exception';
import { Logger } from '@nestjs/common';
import { HydratedDocument, Model, ObjectId } from 'mongoose';
import { MongoError } from 'mongodb';

type MongooseDocument = HydratedDocument<any>;

export type MongooseDocumentID = string | ObjectId;

export abstract class MongooseRepository<Collection, MongooseModel> {
  protected readonly logger: Logger = new Logger(this.constructor.name);

  constructor(protected model: Model<MongooseModel>) {}

  async insertOne(item: Partial<Collection>, name: string): Promise<ObjectId> {
    return this.create(item).then(
      (savedDoc: MongooseDocument) => {
        this.logger.log(
          `${item.constructor.name} '${name}' saved successfully!`
        );
        this.logger.log(`ID: ${savedDoc._id}`);
        return savedDoc._id;
      },
      (err: MongoError) => {
        this.logger.error(err.message);
        throw new MongoDBException(`Error creating ${name}: ${err.message}`);
      }
    );
  }

  async create(document: Partial<Collection>): Promise<MongooseDocument> {
    return new Promise(async (resolve, reject) => {
      this.model.create(document, function (err, savedDoc) {
        if (err) reject(err);
        resolve(savedDoc);
      });
    });
  }

  async find(
    searchParams: any,
    select: any = {},
    sort: any = {}
  ): Promise<any[]> {
    if (Object.keys(select).length === 0) select = { _id: 0 };

    let res = this.model.find(searchParams);

    if (typeof sort === 'object' && Object.keys(sort).length > 0)
      res = res.sort(sort);

    return res.select(select).lean().exec();
  }

  async findOne(
    searchParams: any,
    select: any = {},
    sort: any = {}
  ): Promise<any> {
    if (Object.keys(select).length === 0) select = { _id: 0 };

    let res = this.model.findOne(searchParams);

    if (typeof sort === 'object' && Object.keys(sort).length > 0)
      res = res.sort(sort);

    return res.select(select).lean().exec();
  }

  async groupBy(group, match = {}, select = {}): Promise<any[]> {
    const aggregateParams = [];

    if (Object.keys(match).length > 0) aggregateParams.push({ $match: match });

    aggregateParams.push({
      $group: {
        _id: group,
        count: { $sum: 1 },
        ...MongooseHelper.buildSelectAggregated(select)
      }
    });
    return this.model.aggregate(aggregateParams);
  }
}
