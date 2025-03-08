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
  
  @WebSocketGateway({ cors: { origin: '*' }, namespace: 'send' })
  export class ChattingGateway {
    constructor(
      private chattingService: ChattingService,
      private userService: UserService
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
      console.log(message)
      const savedMessage = await this.chattingService.saveChat(message, message.senderId);
      
      // find socketId of receiver
      const userReceive = await this.userService.findOne(message.receiverId);
      
      if (userReceive?.socketId) {
        // send message
        console.log('sned')
        this.server.emit('receive_message', savedMessage);
      }
    }
  }
  