import { Avatar, Stack } from "@mui/material";
import { MessageBody, MessageText } from "./Chat.styles";

const ChatMessage = ({ date, message, userName, avatarUrl, isOwnMessage }) => {
  return (
    <Stack sx={{ width: '100%', alignItems: isOwnMessage ? 'flex-end' : 'flex-start', mb: 2 }}>
      <p style={{ fontSize: '14px', color: '#d4d4d4', marginBottom: '4px', userSelect: 'none' }}>
        {userName}
      </p>
      <MessageBody isOwnMessage={isOwnMessage}>
        <Avatar src={avatarUrl} />
        <MessageText>{message}</MessageText>
      </MessageBody>
      <p style={{ fontSize: '14px', color: '#d4d4d4', marginTop: '4px', userSelect: 'none' }}>
        {date}
      </p>
    </Stack>
  );
};

export default ChatMessage;
