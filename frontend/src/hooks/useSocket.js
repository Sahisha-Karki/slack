import { useEffect } from 'react';
import { useSocketContext } from '../context/SocketProvider';

const useSocket = (channel, userId, setMessages) => {
  const { socket } = useSocketContext();

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (message) => {
      if (channel && message.channelId === channel._id) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    const handleReceiveDirectMessage = (message) => {
      if (!channel && message.receiverId === userId) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };

    const handleChannelCreated = (newChannel) => {
      if (newChannel._id === channel?._id) {
        setMessages((prevMessages) => [...prevMessages, ...newChannel.messages]);
      }
    };

    // Join the relevant rooms
    if (userId) socket.emit('joinUser', userId);
    if (channel?._id) socket.emit('joinChannel', channel._id);

    // Set up event listeners
    socket.on('receiveMessage', handleReceiveMessage);
    socket.on('receiveDirectMessage', handleReceiveDirectMessage);
    socket.on('channelCreated', handleChannelCreated);

    // Clean up listeners on unmount
    return () => {
      if (userId) socket.emit('leaveUser', userId);
      if (channel?._id) socket.emit('leaveChannel', channel._id);
      socket.off('receiveMessage', handleReceiveMessage);
      socket.off('receiveDirectMessage', handleReceiveDirectMessage);
      socket.off('channelCreated', handleChannelCreated);
    };
  }, [channel, userId, setMessages, socket]);
};

export default useSocket;
