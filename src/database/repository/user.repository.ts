import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base';
import { User, UserDocument } from '../schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends BaseService<UserDocument> {
  constructor(
    @InjectModel(User.name)
    public model: Model<UserDocument>,
  ) {
    super(model);
  }
}
