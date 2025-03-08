const {io } =require('socket.io-client');
const userId = '67cc98bbb51dfbf23ae995bf'
const socket = io(`https://socket-production-d372.up.railway.app/send?userId=${userId}`, {
  transports: ['websocket']
});

socket.on('connect', () => {
  console.log('✅ Connected to WebSocket server');
  
  // Gửi tin nhắn ngay sau khi kết nối thành công
  socket.emit('send_message', {
    senderId: '67cc98bbb51dfbf23ae995bf',
    receiverId: '67cc958da66bb176f17a1f86',
    message: 'Hello from client!',
  });

  console.log('📤 Sent message to server');
});

socket.on('receive_message', (message) => {
  console.log('📩 Message received:', message);
});

socket.on('connect_error', (error) => {
  console.error('❌ Connection failed:', error.message);
});