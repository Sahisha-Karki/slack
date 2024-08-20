import io from 'socket.io-client';

const userId = localStorage.getItem('userId');
const token = localStorage.getItem('token');

const socket = io('http://localhost:5000', {
  transports: ['websocket'],
  query: {
    userId,
    token,
  },
});

socket.on('connect', () => {
  console.log('Socket connected:', socket.id);
});

socket.on('disconnect', () => {
  console.log('Socket disconnected:', socket.id);
});

socket.on('connect_error', (err) => {
  console.error('Socket connection error:', err);
});

export default socket;
