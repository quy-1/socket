
import { Allow, IsString } from 'class-validator';

export class MessageInterface {

  @Allow()
  @IsString()
  message: string;

 
  @Allow()
  @IsString()
  receiverId: string;

  @Allow()
  @IsString()
  senderId: string;
}
