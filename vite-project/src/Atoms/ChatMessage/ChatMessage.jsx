import { Stack, Typography } from "@mui/material";
import { MessageBody, MessageText } from "./Chat.styles";
import { getNome } from "../../Utils/getInfos";

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
    <Stack
      sx={{
        width: '100%',
        justifyContent: informativo
          ? 'center'
          : isOwnMessage
            ? 'flex-end'
            : 'flex-start',
        mb: 2,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingInline: '1rem'
      }}
    >
      {informativo ? (
        <MessageBody isOwnMessage={false}>
          <MessageText>{message}</MessageText>
        </MessageBody>
      ) : (
        <Stack
          sx={{
            alignItems: isOwnMessage ? 'flex-end' : 'flex-start',
            maxWidth: '80%',
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            marginLeft={6}
            sx={{
              justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
              width: '100%',
              mb: 0.5,

            }}
          >
            {!isOwnMessage && (
              <Typography
                sx={{
                  fontSize: '11px',
                  color: '#d4d4d4',
                  fontWeight: 500,
                  userSelect: 'none',
                }}
              >
                {userName}
              </Typography>
            )}

            <Typography
              sx={{
                fontSize: '11px',
                color: '#a0a0a0',
                userSelect: 'none',
              }}
            >
              {formatarDataMensagem()}
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: 'flex-end',
              justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
            }}
          >
            {!isOwnMessage && (
              <Stack
                sx={{
                  minWidth: '40px',
                  height: '40px',
                  backgroundColor: '#FFF',
                  color: '#000',
                  // backgroundColor: '#1d1d1d',
                  // color: '#fff',
                  borderRadius: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}
              >
                {getNome(userName)}
              </Stack>
            )}

            <MessageBody isOwnMessage={isOwnMessage}>
              <MessageText>{message}</MessageText>
            </MessageBody>
          </Stack>
        </Stack>
      )}
    </Stack>
  );

};

export default ChatMessage;
