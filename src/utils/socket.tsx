// // utils/socket.ts
// import { io, Socket } from "socket.io-client";

// // Replace with your actual backend URL
// const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3000";

// export const socket: Socket = io(SOCKET_URL, {
//     autoConnect: true,
//     transports: ["websocket"],
// });

// // Optional: helper to reconnect if needed
// export const connectSocket = () => {
//     if (!socket.connected) {
//         socket.connect();
//     }
// };

// export const disconnectSocket = () => {
//     if (socket.connected) {
//         socket.disconnect();
//     }
// };
