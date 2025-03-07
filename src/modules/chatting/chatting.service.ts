import { Injectable } from '@nestjs/common';
import { MessageInterface } from './dto/message.dto';
import { ChattingRepository } from 'src/database/repository/chatting.repository';

@Injectable()
export class ChattingService {
  constructor(
    private chattingRepository: ChattingRepository,
  ) {}
  async saveChat(message: MessageInterface, sender: any) {
    const chat = {
      ...message,
      sender: sender,
    };
    return await this.chattingRepository.actionCreate(chat);
  }
}
