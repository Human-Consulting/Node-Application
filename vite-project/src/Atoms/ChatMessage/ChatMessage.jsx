import { Avatar, Stack } from "@mui/material";
import { MessageBody, MessageText } from "./Chat.styles";

const ChatMessage = ({ date, message, userName, informativo, isOwnMessage }) => {

  function formatarDataMensagem() {
    const agora = new Date();
    const dataMsg = new Date(date);

    const ehHoje =
      dataMsg.getDate() === agora.getDate() &&
      dataMsg.getMonth() === agora.getMonth() &&
      dataMsg.getFullYear() === agora.getFullYear();

    const ontem = new Date();
    ontem.setDate(ontem.getDate() - 1);

    const ehOntem =
      dataMsg.getDate() === ontem.getDate() &&
      dataMsg.getMonth() === ontem.getMonth() &&
      dataMsg.getFullYear() === ontem.getFullYear();

    if (ehHoje) {
      return dataMsg.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (ehOntem) {
      return `Ontem, ${dataMsg.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return `${dataMsg.toLocaleDateString()}, ${dataMsg.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
  }

  return (
    <Stack sx={{ width: '100%', alignItems: informativo ? 'center' : isOwnMessage ? 'flex-end' : 'flex-start', mb: 2, zIndex: 10 }}>
      {!isOwnMessage && (<p style={{ fontSize: '14px', color: '#d4d4d4', marginBottom: '4px', userSelect: 'none', marginInline: '1rem' }}>
        {userName}
      </p>)}
      <MessageBody isOwnMessage={isOwnMessage}>
        <MessageText>{message}</MessageText>
      </MessageBody>
      {!informativo && <p style={{ fontSize: '14px', color: '#d4d4d4', marginTop: '4px', userSelect: 'none', marginInline: '1rem' }}>
        {formatarDataMensagem()}
      </p>}
    </Stack>
  );
};

export default ChatMessage;
