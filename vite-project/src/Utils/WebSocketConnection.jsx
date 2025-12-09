import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

export const connect = (salas, onMessageReceived) => {
  if (stompClient && stompClient.connected) {
    return;
  }

  console.log("Iniciando conexão com SockJS/STOMP clássico...");

  const socket = new SockJS("http://localhost:8082/websocket");

  stompClient = Stomp.over(socket);

  stompClient.connect(
    {},
    function (frame) {
      salas.forEach((sala) => {
        stompClient.subscribe(`/topic/message/${sala.idSala}`, (message) => {
          const body = JSON.parse(message.body);
          onMessageReceived(sala.idSala, body);
        });
      });
    },
    (error) => {
      console.error("❌ Erro na conexão STOMP:", error);
    }
  );
};
