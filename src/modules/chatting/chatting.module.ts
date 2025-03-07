import { Module } from '@nestjs/common';
import { ChattingService } from './chatting.service';
import { ChattingGateway } from './chatting.gateway';
import { ChattingRepository } from 'src/database/repository/chatting.repository';
import { UserService } from '../user/user.service';
import ChattingSchema, { Chatting } from 'src/database/schema/chatting.schema';
import UserSchema, { User } from 'src/database/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from 'src/database/repository/user.repository';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chatting.name, schema: ChattingSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [],
  providers: [ChattingService, ChattingGateway,ChattingRepository, UserService, UserRepository],
})
export class ChattingModule {}
