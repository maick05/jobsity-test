import { Logger } from '@nestjs/common';
import { HydratedDocument, Model, ObjectId } from 'mongoose';
import { MongoError } from 'mongodb';
import { getModelToken } from '@nestjs/mongoose';

type MongooseDocument = HydratedDocument<any>;

export type MongooseDocumentID = string | ObjectId;

export abstract class MongooseRepository<Collection, MongooseModel> {
  protected readonly logger: Logger = new Logger(this.constructor.name);

  constructor(protected model: Model<MongooseModel>) {}

  async insertOne(item: Collection, name: string): Promise<ObjectId> {
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
        throw new Error(err.message);
      }
    );
  }

  async create(document: Collection): Promise<MongooseDocument> {
    return new Promise(async (resolve, reject) => {
      this.model.create(document, function (err, savedDoc) {
        if (err) reject(err);
        resolve(savedDoc);
      });
    });
  }

  async findAll(select: object = {}): Promise<any[]> {
    if (Object.keys(select).length === 0) select = { _id: 0 };
    return this.model.find({}).select(select).lean().exec();
  }

  async findById(
    id: MongooseDocumentID,
    select: object = {}
  ): Promise<MongooseDocument> {
    if (Object.keys(select).length === 0) select = { _id: 0 };
    return this.model.findById(id).select(select).lean().exec();
  }

  async updateOneById(id: MongooseDocumentID, data: any): Promise<void> {
    const res = await this.updateOne({ _id: id }, data);
    this.logger.log(
      `${getModelToken(this.model.name)} ${id} - Succesfully updated!.`
    );
    return res;
  }

  async updateOne(query: any, data: any, pushData = {}): Promise<void> {
    this.model.findOneAndUpdate(
      query,
      { $set: data, ...pushData },
      { upsert: false },
      function (err: MongoError) {
        if (err) throw new Error(err.message);
      }
    );
  }

  async deleteOneById(id: string | number): Promise<void> {
    await this.model.deleteOne({ id });
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
}
