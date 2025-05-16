import { Avatar, Stack } from "@mui/material"
import {  MessageBody, MessageText } from "./Chat.styles"

const ChatMessage = ({ date, message, userName, avatarUrl, isOwnMessage }) => {
  return (
    <Stack sx={{ width: '100%', alignItems: isOwnMessage ? 'flex-end' : 'flex-start' }}>
      <Stack sx={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between'}}>
      <p style={{ fontSize: '14px', color: '#d4d4d4' }}>{userName}</p>

      </Stack>
      <MessageBody style={{ flexDirection: isOwnMessage ? 'row-reverse' : 'row' }}>
        <Avatar src={avatarUrl} />
        <MessageText>{message}</MessageText>
      </MessageBody>
      <p style={{ fontSize: '14px', color: '#d4d4d4' }}>{date}</p>


    </Stack>
  )
}

export default ChatMessage
