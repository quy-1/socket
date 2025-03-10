const {io } =require('socket.io-client');
const userId = '67cc98bbb51dfbf23ae995bf'
const socket = io(`ws://localhost:3001/send`, {
  transports: ['websocket']
});

socket.on('connect', () => {
  console.log('✅ Connected to WebSocket server');
console.log(socket.id)
  console.log('📤 connected');
});

socket.on('receive_message', (message) => {
  console.log('📩 Message received:', message);
});

socket.on('connect_error', (error) => {
  console.error('❌ Connection failed:', error.message);
});