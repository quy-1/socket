const  io =require('socket.io-client') ;


const socket = io('ws://localhost:3001', {
  transports: ['websocket'],
});

socket.on('connect', () => {
  console.log('✅ Connected to WebSocket server');
  console.log('Socket ID:', socket.id);

  // Gửi tin nhắn khi kết nối thành công
  socket.emit('send_message', {
    senderId: 'user123',
    receiverId: 'user456',
    content: 'Hello from client!',
  });

  console.log('📤 Sent message:', {
    senderId: 'user123',
    receiverId: 'user456',
    content: 'Hello from client!',
  });
});

// Nhận phản hồi từ server
socket.on('receiveMessage', (message) => {
  console.log('📩 New message received:', message);
});

socket.on('connect_error', (error) => {
  console.error('❌ Connection failed:', error.message);
});
