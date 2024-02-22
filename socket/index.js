const { Server } = require("socket.io");

const io = new Server(7000, { cors: "http://localhost:3000" });

io.on("connection", (socket) => {
  console.log("new connnection", socket.id)
});