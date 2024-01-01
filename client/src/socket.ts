import { io } from "socket.io-client";


const apiUrl = import.meta.env.VITE_SOCKET_IO_URL || "http://localhost:5000/";
console.log(`SOCKET URL: ${apiUrl}`);

export const socket = io(apiUrl);
