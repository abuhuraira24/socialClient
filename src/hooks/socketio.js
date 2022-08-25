import io from "socket.io-client";

// export const socket = io("https://mysocketioserver.herokuapp.com/");

// console.log(process.env.SOCKETIO_SERVER_URL);
export const socket = io(process.env.REACT_APP_SOCKETIO_SERVER_URL);
