import { useState } from "react";
import { Button, Stack } from "@mui/material";
import {
  BackChat,
  ContainerGeral,
  LateralMessage,
  Scroll,
  TextInput
} from "./Chat.styles";
import ChatMessage from "../../Atoms/ChatMessage/ChatMessage";

const Chat = () => {
  const currentUserId = 1; 
  const [selectedChatId, setSelectedChatId] = useState("chat-1");

  const mockMessages = [
    {
      chatId: "chat-1",
      participants: [
        { id: 1, name: "Samuel Luciano", avatarUrl: "https://i.pravatar.cc/150?img=1" },
        { id: 2, name: "Maria Souza", avatarUrl: "https://i.pravatar.cc/150?img=2" }
      ],
      messages: [
        { id: 1, senderId: 1, message: "Oi Maria! Tudo certo por aí?", date: "09:00" },
        { id: 2, senderId: 2, message: "Bom dia! Tudo sim, e contigo?", date: "09:01" },
        { id: 3, senderId: 1, message: "Tranquilo. Já viu o novo layout?", date: "09:03" },
        { id: 4, senderId: 2, message: "Vi sim. Achei ótimo!", date: "09:04" },
        { id: 4, senderId: 2, message: "Vi sim. Achei ótimo!", date: "09:04" },
        { id: 4, senderId: 2, message: "Vi sim. Achei ótimo!", date: "09:04" },
        { id: 4, senderId: 2, message: "Vi sim. Achei ótimo!", date: "09:04" },
        { id: 4, senderId: 2, message: "Vi sim. Achei ótimo!", date: "09:04" },
        { id: 4, senderId: 2, message: "Vi sim. Achei ótimo!", date: "09:04" },
        { id: 4, senderId: 2, message: "Vi sim. Achei ótimo!", date: "09:04" },

      ]
    },
    {
      chatId: "chat-2",
      participants: [
        { id: 1, name: "Samuel Luciano", avatarUrl: "https://i.pravatar.cc/150?img=1" },
        { id: 3, name: "João Pedro", avatarUrl: "https://i.pravatar.cc/150?img=3" }
      ],
      messages: [
        { id: 1, senderId: 3, message: "E aí, Samuel! Já viu aquele bug da home?", date: "08:30" },
        { id: 2, senderId: 1, message: "Bom dia! Sim, to olhando agora.", date: "08:31" }
      ]
    },
    {
      chatId: "chat-3",
      participants: [
        { id: 1, name: "Samuel Luciano", avatarUrl: "https://i.pravatar.cc/150?img=1" },
        { id: 4, name: "Luana Martins", avatarUrl: "https://i.pravatar.cc/150?img=4" }
      ],
      messages: [
        { id: 1, senderId: 4, message: "Samuel, consegue revisar o cronograma?", date: "11:00" },
        { id: 2, senderId: 1, message: "Consigo sim!", date: "11:02" }
      ]
    }
  ];

  const selectedChat = mockMessages.find(chat => chat.chatId === selectedChatId);

  const getSenderInfo = (chat, senderId) => {
    return chat.participants.find(participant => participant.id === senderId);
  };

  return (
    <ContainerGeral>
      <LateralMessage>
        {mockMessages.map((chat) => {
          const otherParticipant = chat.participants.find(p => p.id !== currentUserId);
          return (
            <div
              key={chat.chatId}
              onClick={() => setSelectedChatId(chat.chatId)}
              style={{
                padding: "10px",
                cursor: "pointer",
                backgroundColor: chat.chatId === selectedChatId ? "#2aa128" : "transparent"
              }}
            >
              <strong>{otherParticipant.name}</strong>
            </div>
          );
        })}
      </LateralMessage>

      <BackChat>
        <Scroll>
          {selectedChat.messages.map((msg) => {
            const sender = getSenderInfo(selectedChat, msg.senderId);
            return (
              <ChatMessage
                key={msg.id}
                userName={sender.name}
                date={msg.date}
                message={msg.message}
                avatarUrl={sender.avatarUrl}
                isOwnMessage={msg.senderId === currentUserId}
              />
            );
          })}
        </Scroll>

        <Stack sx={{ flexDirection: "row", position: "absolute", width: "100%", bottom: "20px", gap: "0.5rem" }}>
          <TextInput placeholder="Digite uma mensagem" />
          <Button variant="contained" size="large">Enviar</Button>
        </Stack>
      </BackChat>
    </ContainerGeral>
  );
};

export default Chat;
