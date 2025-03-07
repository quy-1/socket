import { Module } from '@nestjs/common';
import { ChattingModule } from './modules/chatting/chatting.module';
import { MongooseModule } from '@nestjs/mongoose';
require('dotenv').config();

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.DATABASE_URL,
      {
        connectionFactory: (connection) => {
          return connection;
        },
      },
    ),
    ChattingModule
  ],
  providers: [],
})
export class AppModule {}
