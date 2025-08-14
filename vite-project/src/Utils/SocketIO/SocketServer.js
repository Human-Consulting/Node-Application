// import express from "express";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import path from "path";
// import cluster from 'node:cluster';
// import sqlite3 from "sqlite3";
// import { open } from "sqlite";
// import { fileURLToPath } from 'node:url';
// import { createAdapter, setupPrimary } from '@socket.io/cluster-adapter';

// const app = express();
// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"]
//   }
// });
// if (cluster.isPrimary) {
//   cluster.fork();

//   setupPrimary();
// } else {
//   const port = 3001;
//   const app = express();
//   const server = createServer(app);
//   const io = new Server(server, {
//     cors: {
//       origin: "http://localhost:5173",
//       methods: ["GET", "POST"]
//     },
//     connectionStateRecovery: {},
//     adapter: createAdapter(),
//   });
//   const __dirname = path.dirname(fileURLToPath(import.meta.url));

//   // Configuração do banco de dados
//   const initDB = async () => {
//     const db = await open({
//       filename: path.join(__dirname, 'chat.db'),
//       driver: sqlite3.Database,
//     });

//     await db.exec(`
//     CREATE TABLE IF NOT EXISTS messages (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       user TEXT,
//       sala TEXT,
//       content TEXT
//     );
//   `);

//     return db;
//   };

//   const db = await initDB();

//   app.use(express.static(path.join(__dirname, "public")));

//   app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "public/index.html"));
//   });

//   io.on('connection', (socket) => {

//     console.log("trying to create connection");

//     const createRoom = async (sala) => {
//       console.log("on createRoomm with name: " + sala.nome)
//       const rows = await db.all('SELECT idSala FROM sala WHERE fkSala = ?', sala.idSala);
//       if (rows.length == 0) {
  
//         await db.run('INSERT INTO sala (nomeSala, fkSala) VALUES (?, ?)', sala.nomeSala, sala.idSala);
//         socket.join(sala.idSala);
//         socket.emit('roomCreated', { success: true });
//       } else {
//         socket.emit('roomCreated', { success: false, error: 'Room already exists.' });
//       }
//     }

//     socket.on('joinRoom', async ({ nomeSala, fkSala }, callback) => {
//       console.log("joinRooooooooomm")
//       const rowsSala = await db.all('SELECT idSala, nomeSala FROM sala WHERE fkSala = ?', fkSala);
//       if (rowsSala.length > 1) {
//         socket.join(fkSala);
//         try {
//           const rowsMessage = await db.all('SELECT user, content FROM messages WHERE fkSala = ?', rowsSala[0].idSala);
//           rowsMessage.forEach((row) => {
//             socket.emit('chat message', { user: row.user, room: nome, message: row.content });
//           });
//           callback({ success: true });
//         } catch (err) {
//           console.error('Erro ao recuperar mensagens:', err.message);
//           callback({ success: false, error: 'Erro ao recuperar mensagens.' });
//         }
//       } else {
//         createRoom({nomeSala, fkSala});
//       }
//     });

//     socket.on('ver salas', async () => {
//       const rows = await db.all('SELECT nomeSala FROM sala;');
//       socket.emit('ver salas', { rows });
//     });

//     socket.on('chat message', ({ room, message, user }) => {
//       (async () => {
//         try {
//           const rowsSala = await db.all('SELECT idSala FROM sala WHERE nomeSala = ?', room);

//           await db.run('INSERT INTO messages (user, content, sala) VALUES (?, ?, ?)', user, message, rowsSala[0].idSala);
//           io.to(room).emit('chat message', { user, room, message });
//         } catch (err) {
//           console.error('Erro ao salvar mensagem:', err.message);
//         }
//       })();
//     });

//     socket.on('sair', ({ room, user }) => {

//       (async () => {
//         try {
//           const aviso = 'deslogou';
//           io.to(room).emit('avisar sala', { user, room, aviso });
//         } catch (err) {
//           console.error('Erro ao sair:', err.message);
//         }
//       })();
//     });

//     socket.on('truncateTableMessages', () => {
//       (async () => {
//         try {
//           await db.run('DELETE FROM messages');
//           io.emit('truncateTable');
//         } catch (err) {
//           console.error('Erro ao limpar banco de dados:', err.message);
//         }
//       })();
//     });

//     socket.on('truncateTableSala', () => {
//       (async () => {
//         try {
//           await db.run('DELETE FROM sala');
//           io.emit('truncateTable');
//         } catch (err) {
//           console.error('Erro ao limpar banco de dados:', err.message);
//         }
//       })();
//     });
//   });

//   server.listen(port, () => {
//     console.log(`Servidor rodando em http://localhost:${port}`);
//   });

// }