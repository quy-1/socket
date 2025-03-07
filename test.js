const {io } =require('socket.io-client');
const userId = '507f1f77bcf86cd799439011'
const socket = io(`ws://localhost:3001/send?userId=${userId}`, {
  transports: ['websocket']
});

socket.on('connect', () => {
  console.log('✅ Connected to WebSocket server');
  
  // Gửi tin nhắn ngay sau khi kết nối thành công
  socket.emit('send_message', {
    senderId: '507f1f77bcf86cd799439011',
    receiverId: '507f1f77bcf86cd799439011',
    content: 'Hello from client!',
  });

  console.log('📤 Sent message to server');
});

socket.on('receive_message', (message) => {
  console.log('📩 Message received:', message);
});

socket.on('connect_error', (error) => {
  console.error('❌ Connection failed:', error.message);
});