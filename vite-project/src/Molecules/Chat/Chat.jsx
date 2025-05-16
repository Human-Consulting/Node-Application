import { useState, useEffect, useRef } from "react";
import { Avatar, Button, Stack} from "@mui/material";
import {
  BackChat,
  ContainerGeral,
  LateralMessage,
  Scroll,
  TextInput,
  ChatInputContainer,
  ContactItem
} from "./Chat.styles";
import ChatMessage from "../../Atoms/ChatMessage/ChatMessage";
import useMessage from "../../Utils/cruds/UseMessage";

const Chat = () => {
  const currentUserId = 1;
  const [selectedChatId, setSelectedChatId] = useState(1);
  const [chats, setChats] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const scrollRef = useRef(null);

  const { sendMessage } = useMessage();

  useEffect(() => {
    const fetchChats = async () => {
      const response = await fetch("http://localhost:3001/chats");
      const data = await response.json();
      setChats(data);
    };
    fetchChats();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedChatId, chats]);

  const selectedChat = chats.find(chat => chat.id === selectedChatId);

  const getSenderInfo = (chat, senderId) => {
    return chat.participants.find(participant => participant.id === senderId);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMsg = {
      senderId: currentUserId,
      message: inputMessage.trim(),
      date: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const updatedMessages = await sendMessage(selectedChatId, newMsg);
    if (updatedMessages) {
      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === selectedChatId
            ? { ...chat, messages: updatedMessages }
            : chat
        )
      );
      setInputMessage("");
    }
  };

  return (
    <ContainerGeral>
      <LateralMessage>
        {chats.map(chat => {
          const otherParticipant = chat.participants.find(p => p.id !== currentUserId);
          return (
            <ContactItem
              key={chat.id}
              active={chat.id === selectedChatId}
              onClick={() => setSelectedChatId(chat.id)}
              sx={{ userSelect: 'none' }}
            >
              <Stack sx={{flexDirection: 'row', alignItems: 'center', gap: '1rem'}}>
              <Avatar src={otherParticipant.avatarUrl} />
              <strong style={{ color: 'white' }}>{otherParticipant.name}</strong>
              </Stack>
        
            </ContactItem>
          );
        })}
      </LateralMessage>

      <BackChat>
        <Scroll ref={scrollRef}>
          {selectedChat?.messages.map(msg => {
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

        <ChatInputContainer>
          <TextInput
            placeholder="Digite uma mensagem"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button variant="contained" size="large" onClick={handleSendMessage}>
            Enviar
          </Button>
        </ChatInputContainer>
      </BackChat>
    </ContainerGeral>
  );
};

export default Chat;
