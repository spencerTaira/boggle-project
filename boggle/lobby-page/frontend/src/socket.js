import io from "socket.io-client";

export const SOCKET_URL = ""; // TODO:

export const socket = io(SOCKET_URL);
