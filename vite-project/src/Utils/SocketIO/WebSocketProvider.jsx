// Utils/WebSocketProvider.jsx
import { createContext, useContext, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const socketRef = useRef(null);

  useEffect(() => {
    const socket = io("http://localhost:8081", {
      transports: ['websocket'],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("🔌 Conectado ao WebSocket com id:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("❌ Desconectado do WebSocket");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Entrar em uma sala
  const joinSala = (salaId) => {
    console.log("joinSala: " + salaId);
    socketRef.current?.emit("joinSala", salaId);
  };

  // Enviar nova mensagem
  const enviarMensagem = (mensagem) => {
    console.log("novaMensagem: " + mensagem);
    socketRef.current?.emit("novaMensagem", mensagem);
  };

  // Assinar escuta de nova mensagem para uma sala
  const subscribeToSala = (callback) => {
    console.log("subscribeToSala: " + callback);
    socketRef.current?.on("novaMensagem", (mensagem) => {
      callback(mensagem);
    });
  };

  const value = {
    socket: socketRef.current,
    joinSala,
    enviarMensagem,
    subscribeToSala,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
