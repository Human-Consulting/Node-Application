// // socketServer.js
// import http from 'http';
// import { Server } from "socket.io";

// const httpServer = http.createServer();

// const io = new Server(httpServer, {
//   cors: {
//     origin: "*",
//   },
// });

// io.on("connection", (socket) => {
//   console.log("🟢 Cliente conectado:", socket.id);

//   socket.on("joinSala", (salaId) => {
//     socket.join(salaId);
//     console.log(`👥 Socket ${socket.id} entrou na sala ${salaId}`);
//   });

//   socket.on("novaMensagem", (mensagem) => {
//     console.log(`💬 Mensagem recebida na sala ${mensagem.fkSala}:`, mensagem);
//     io.to(mensagem.fkSala).emit("novaMensagem", mensagem);
//   });

//   socket.on("disconnect", () => {
//     console.log("🔴 Cliente desconectado:", socket.id);
//   });
// });

// const PORT = 8081;
// httpServer.listen(PORT, () => {
//   console.log(`🚀 Servidor WebSocket rodando em http://localhost:${PORT}`);
// });