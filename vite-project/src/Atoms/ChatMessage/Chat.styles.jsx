import { Box } from '@mui/material';
import { styled } from '@mui/system';


export const MessageBody = styled(Box)(({ isOwnMessage }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: isOwnMessage ? '#1B4F72' : '#2C2F33',
  borderRadius: '8px',
  padding: '8px 12px',
  maxWidth: '100%',
  wordBreak: 'break-word',
  color: '#FFF',
  alignSelf: isOwnMessage ? 'flex-end' : 'flex-start',
  boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
}));

export const MessageText = styled('p')({
  margin: 0,
  fontSize: '15px',
  lineHeight: 1.4,
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
