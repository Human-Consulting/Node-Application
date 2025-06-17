import { Box } from '@mui/material';
import { styled } from '@mui/system';


export const MessageBody = styled(Box)(({ isOwnMessage }) => ({
  display: 'flex',
  flexDirection: isOwnMessage ? 'row-reverse' : 'row',
  alignItems: 'flex-start',
  backgroundColor: '#ffffff',
  // backgroundColor: isOwnMessage ? '#084B8A' : '#2C2F33',
  backgroundColor: isOwnMessage ? '#1A4D7A' : '#2C2F33',
  borderRadius: '10px',
  padding: '10px',
  maxWidth: '80%',
  wordBreak: 'break-word',
  marginInline: '1rem'
}));

export const MessageText = styled('p')({
  margin: 0,
  padding: '0 10px',
  fontSize: '16px',
  color: '#000',
  color: '#FFF',
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap',
});

export const MessageWrapper = styled(Box)(({ sent }) => ({
  maxWidth: '70%',
  marginBottom: '14px',
  display: 'flex',
  flexDirection: 'column',
  fontSize: '0.9rem',
  lineHeight: 1.3,
  alignSelf: sent ? 'flex-end' : 'flex-start',
  textAlign: sent ? 'right' : 'left',
}));

export const MessageSender = styled('span')({
  fontWeight: 600,
  marginBottom: '4px',
  color: '#a1a1a1',
  userSelect: 'none',
});

export const MessageBox = styled(Box)(({ sent }) => ({
  padding: '12px 16px',
  borderRadius: '16px',
  backgroundColor: sent ? '#28a745' : '#2a2a2a',
  color: sent ? '#f0f0f0' : '#ddd',
  boxShadow: '0 2px 6px rgb(0 0 0 / 0.25)',
  position: 'relative',
  wordBreak: 'break-word',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
}));

export const MessageTime = styled('span')({
  fontSize: '0.75rem',
  color: '#777',
  marginTop: '2px',
  userSelect: 'none',
});
