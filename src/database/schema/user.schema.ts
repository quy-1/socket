import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
export type UserDocument = User & Document;

@Schema({
  collection: 'User',
})
export class User {
  _id: string;

  @Prop({
    type: String,
    default: (Math.random() + 1).toString(36).substring(7),
  })
  username: string;

  @Prop({ type: String, trim: true, unique: true })
  email: string;

  @Prop({ type: String, trim: true })
  gender: string;

  @Prop({ type: String, trim: true })
  avatar: string;

  @Prop({ type: String, trim: true })
  refreshToken: string;

  @Prop({ type: String, trim: true })
  socketId: string;

  @Prop({
    type: String,
    required: false,
    trim: true,
    unique: false,
    index: true,
  })
  firebaseId: string;

  @Prop({
    type: {
      type: String,
    },
    coordinates: { type: [Number] },
  })
  location: {
    type: string;
    coordinates: [number];
  };

  @Prop({ type: Boolean, required: true, default: true })
  status: boolean;

  @Prop({ type: Boolean, required: true, default: false })
  isLoggin: boolean;

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

  @Prop({
    type: Date,
  })
  lastLogin: Date;
}
const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre('save', async function (next) {
  UserSchema.index({ location: '2dsphere' });
  next();
});
export default UserSchema;
