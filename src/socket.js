import { io } from "socket.io-client";

const URL = process.env.BACKEND || "http://localhost:9000";

export const socket = io(URL, {
  autoConnect: false,
});
