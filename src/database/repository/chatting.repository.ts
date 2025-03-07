import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chatting, ChattingDocument } from '../schema/chatting.schema';

@Injectable()
export class ChattingRepository extends BaseService<ChattingDocument> {
  constructor(
    @InjectModel(Chatting.name)
    public model: Model<ChattingDocument>,
  ) {
    super(model);
  }
}
