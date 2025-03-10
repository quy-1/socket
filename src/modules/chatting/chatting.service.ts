import { Injectable } from '@nestjs/common';
import { MessageInterface } from './dto/message.dto';
import { ChattingRepository } from 'src/database/repository/chatting.repository';

@Injectable()
export class ChattingService {
  constructor(
    private chattingRepository: ChattingRepository,
  ) {}
  async saveChat(message: MessageInterface, sender: string, conversationId: string) {
    const data = {
      ...message,
      sender: sender,
      receiver: message.receiverId,
      conversation: conversationId
    };
    return await this.chattingRepository.actionCreate(data);
  }
}
