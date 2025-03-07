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
  
    // Khi server khởi tạo
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
    console.log(client.handshake.query.userId)
      const userId = client.handshake.query.userId as string;
      if (userId) {
      await this.userService.update(userId, { socketId: client.id });
      console.log(`✅ User ${userId} mapped to socket ${client.id}`);
    }
    }
    
   
  
    // Khi client ngắt kết nối
    async handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
      const socketId = client.id as string
      // Cập nhật socketId thành null khi user disconnect
      await this.userService.updateBySocketId( socketId, { socketId: null });
    }
  
    // Nhận tin nhắn từ client
    @SubscribeMessage('send_message')
    async listenForMessages(
      @MessageBody() message: MessageInterface,
      @ConnectedSocket() client: Socket // Lấy socket hiện tại
    ) {
      const savedMessage = await this.chattingService.saveChat(message, message.senderId);
      
      // Tìm socketId của người nhận
      const userReceive = await this.userService.findOne(message.receiverId);
      
      if (userReceive?.socketId) {
        // Gửi tin nhắn đến đúng người nhận
        this.server.to(userReceive.socketId).emit('receive_message', savedMessage);
      }
    }
  }
  