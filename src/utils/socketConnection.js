import io from "socket.io-client";
const options = {
  auth: {
    token: "123",
    clientType: "frontend",
  },
};
const socket = io.connect("http://localhost:5000", options);

export default socket;
