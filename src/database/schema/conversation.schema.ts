import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Chatting } from './chatting.schema';
import { User } from './user.schema';

export type ConversationDocument = Conversation & Document;

@Schema({
  collection: 'Conversation',
})
export class Conversation {
  _id: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  })
  participants: [User];

  @Prop({
    type: String,
    default: 'PRIVATE',
  })
  type: ['PRIVATE', 'GROUP'];
  
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  lastMessage: Chatting;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    default: null
  })
  admin: User;

  @Prop({
    type: String,
    default: null
  })
  avatar: string;

  @Prop({
    type: String,
    default: null
  })
  groupName: string;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    type: Date,
    default: Date.now,
  })
  updatedAt: Date;
}
const ConversationSchema = SchemaFactory.createForClass(Conversation);
export default ConversationSchema;
