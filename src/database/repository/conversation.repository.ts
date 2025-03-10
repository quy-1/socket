import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chatting, ChattingDocument } from '../schema/chatting.schema';
import { Conversation, ConversationDocument } from '../schema/conversation.schema';

@Injectable()
export class ConversationRepository extends BaseService<ConversationDocument> {
  constructor(
    @InjectModel(Conversation.name)
    public model: Model<ConversationDocument>,
  ) {
    super(model);
  }
}
