import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: ["http://localhost:8081"],
  },
});

io.on("connection", (socket) => {
  console.log(`connect: ${socket.id}`, socket.request.headers);

  socket.on("message", (message) => {
    console.log(`Message from ${socket.id}: ${message}`);
    io.emit("message", message); // Broadcast the message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log(`disconnect: ${socket.id}`);
  });
});

io.listen(3000);
