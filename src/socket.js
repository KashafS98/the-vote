import { io } from "socket.io-client";

const URL = process.env.REACT_APP_BACKEND;

export const socket = io(URL, {
  autoConnect: false,
  transports: ["websocket"],
  withCredentials: true,
});
