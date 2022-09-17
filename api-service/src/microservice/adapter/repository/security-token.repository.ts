import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  SecurityToken,
  SecurityTokenDocument
} from '../../domain/schema/security-tokens.schema';
import { MongooseRepository } from '../../domain/repository/mongoose.repository';

@Injectable()
export class SecurityTokenMongooseRepository extends MongooseRepository<
  SecurityToken,
  SecurityTokenDocument
> {
  constructor(
    @InjectModel(SecurityToken.name)
    model: Model<SecurityTokenDocument>
  ) {
    super(model);
  }
}
