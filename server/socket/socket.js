import { Server } from "socket.io";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PATCH"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client Connected:", socket.id);

    socket.on("join-order", (orderId) => {
      socket.join(orderId);
      console.log(`Socket joined room: ${orderId}`);
    });

    socket.on("disconnect", () => {
      console.log("Client Disconnected:", socket.id);
    });
  });
};

export const getIO = () => io;
