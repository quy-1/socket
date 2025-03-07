import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { ChatService } from './chat/chat.service';
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
    ChatModule
  ],
  providers: [ChatService],
})
export class AppModule {}
