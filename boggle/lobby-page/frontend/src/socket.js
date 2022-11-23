import io from "socket.io-client";

export const SOCKET_URL = "localhost:5001"; // TODO:

// client-side

// const io = require("socket.io-client");
// const socket = io("http://localhost:"5000", {
//   withCredentials: true,
//   extraHeaders: {
//     "my-custom-header": "abcd"
//   }
// });

export const socket = io(SOCKET_URL);
