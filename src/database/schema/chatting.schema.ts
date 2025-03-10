import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';
import { Conversation } from './conversation.schema';
export type ChattingDocument = Chatting & Document;

@Schema({
  collection: 'Chatting',
})
export class Chatting {
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  sender: User;

  @Prop({ type: String })
  socketId: string;

  @Prop({
    type: String,
    required: true,
  })
  message: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  receiver: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Conversation.name })
  conversation: Conversation;

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
const ChattingSchema = SchemaFactory.createForClass(Chatting);
export default ChattingSchema;
