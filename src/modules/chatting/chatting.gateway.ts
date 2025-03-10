import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
  } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChattingService } from './chatting.service';
import { MessageInterface } from './dto/message.dto';
import { UserService } from '../user/user.service';
import { ConversationRepository } from 'src/database/repository/conversation.repository';
import { BadRequestException } from '@nestjs/common';
  
  @WebSocketGateway({ cors: { origin: '*' }, namespace: 'send' })
  export class ChattingGateway {
    constructor(
      private chattingService: ChattingService,
      private userService: UserService,
      private conversationRepository: ConversationRepository
    ) {}
  
    @WebSocketServer()
    server: Server; 
  
    afterInit(server: Server) {
      console.log('WebSocket initialized!');
    }
   async handleConnection(client: Socket) {
     
      console.log(`🔌 Client connected: ${client.id}`);
      client.on('disconnect', (reason) => {
        console.log(`❌ Client disconnected: ${client.id}, Reason: ${reason}`);
      });
    
      client.on('error', (err) => {
        console.error(`🔥 WebSocket error: ${err.message}`);
      });
      
      const userId = client.handshake.query.userId as string;
      if (userId) {
      await this.userService.update(userId, { socketId: client.id });
      console.log(`✅ User ${userId} mapped to socket ${client.id}`);
    }
    }
    
   
  
    async handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
      const socketId = client.id as string
      await this.userService.updateBySocketId( socketId, { socketId: null });
    }
  
    // receive message from client
    @SubscribeMessage('send_message')
    async listenForMessages(
      @MessageBody() message: MessageInterface,
      @ConnectedSocket() client: Socket
    ) {
      try{
      let conversation
      conversation = await this.conversationRepository.actionGetOne({participants: { $all: [message.senderId, message.receiverId] }})
      if(!conversation){
         conversation = await this.conversationRepository.actionCreate({ participants:[message.senderId, message.receiverId], type:'PRIVATE',})
      }
     
      const savedMessage = await this.chattingService.saveChat(message, message.senderId, conversation._id);
      if(!savedMessage){
        throw new BadRequestException(`Cannot save this message ${message.message}`)
      }

      await this.conversationRepository.actionFindByIdAndUpdate(conversation._id,{ lastMessage: savedMessage._id })

      // find socketId of receiver
      const userReceive = await this.userService.findOne({_id:message.receiverId});
      if (!userReceive?.socketId) {
        throw new BadRequestException(`Not found receiver`)
      }
        console.log(userReceive?.socketId)
      console.log('send success')
      this.server.to(userReceive?.socketId).emit('receive_message', savedMessage);
    }catch(err:any){
      console.log(err)
    }
  }
  }
  