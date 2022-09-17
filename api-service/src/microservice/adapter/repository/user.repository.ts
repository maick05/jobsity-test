import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../domain/schemas/user.schema';
import { MongooseRepository } from '../../domain/repository/mongoose.repository';

@Injectable()
export class UsersMongooseRepository extends MongooseRepository<
  User,
  UserDocument
> {
  constructor(
    @InjectModel(User.name)
    model: Model<UserDocument>
  ) {
    super(model);
  }
}
