import io from "socket.io-client";

const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  query: {
    userId: localStorage.getItem("userId"),
    token: localStorage.getItem("token"),
  },
});

socket.on("connect", () => {
  console.log("Socket connected:", socket.id);
  socket.emit("register", userId);
});

socket.on("disconnect", () => {
  console.log("Socket disconnected:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err);
});

socket.io.on("reconnect_attempt", () => {
  console.log("Attempting to reconnect...");
});

socket.io.on("reconnect", () => {
  console.log("Reconnected successfully");

  socket.emit("register", userId);

  const currentChannelId = localStorage.getItem("currentChannelId");
  if (currentChannelId) {
    socket.emit("joinChannel", currentChannelId);
  }
});

socket.on("receiveMessage", (messageData) => {
  console.log("New message received:", messageData);
});

socket.on("receiveDirectMessage", (messageData) => {
  console.log("Received direct message:", messageData);
});

export const joinChannel = (channelId) => {
  if (socket) {
    localStorage.setItem("currentChannelId", channelId);
    socket.emit("joinChannel", channelId);
    console.log(`Joined channel ${channelId}`);
  } else {
    console.error("Socket not initialized.");
  }
};

export const sendChannelMessage = (channelId, content) => {
  if (socket) {
    socket.emit("sendMessage", { channelId, content, messageType: "channel" });
  } else {
    console.error("Socket not initialized.");
  }
};

export const sendDirectMessage = (receiverId, content) => {
  if (socket) {
    socket.emit("sendMessage", { receiverId, content, messageType: "direct" });
  } else {
    console.error("Socket not initialized.");
  }
};

export const leaveChannel = (channelId) => {
  if (socket) {
    socket.emit("leaveChannel", channelId);
    console.log(`Left channel ${channelId}`);
  } else {
    console.error("Socket not initialized.");
  }
};

export default socket;