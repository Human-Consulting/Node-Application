import { Box, Button, InputBase } from '@mui/material';
import { styled } from '@mui/system';

export const TextInput = styled('input')({
    width: '75%',
    height: '50px',
    padding: '1rem'
 
  });
  

export const ContainerGeral = styled(Box)({
  width: '70vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'row',
  backgroundColor: '#121212',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
});

export const LateralMessage = styled(Box)({
  width: '280px',
  height: '100%',
  backgroundColor: '#1f1f1f',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  borderRight: '1px solid #333',
  paddingTop: '10px',
});

export const ContactItem = styled(Box)(({ active }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px 16px',
  cursor: 'pointer',
  borderRadius: '8px',
  margin: '4px 10px',
  border: active ? '1px solid #36518c' : 'transparent',
  color: active ? '#fff' : '#eee',
  fontWeight: active ? 600 : 400,
  transition: 'background-color 0.25s ease',
  '&:hover': {
    backgroundColor: active ? '#36518c' : '#333',
  },
}));

export const ContactAvatar = styled('img')({
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  marginRight: '12px',
  objectFit: 'cover',
  boxShadow: '0 0 4px rgba(0,0,0,0.7)',
});

export const ContactName = styled('span')({
  fontSize: '1rem',
  userSelect: 'none',
});

export const BackChat = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#181818',
  padding: '20px 24px',
  overflowY: 'auto',
  scrollBehavior: 'smooth',
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

export const MessageAvatar = styled('img')({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  objectFit: 'cover',
  boxShadow: '0 0 6px rgba(0,0,0,0.6)',
});

export const ChatInputContainer = styled(Box)({
  display: 'flex',
  padding: '14px 24px',
  backgroundColor: '#1e1e1e',
  borderTop: '1px solid #333',
});

export const ChatInput = styled(InputBase)({
  flex: 1,
  padding: '12px 16px',
  fontSize: '1rem',
  borderRadius: '24px',
  backgroundColor: '#2b2b2b',
  color: '#eee',
  '& .MuiInputBase-input::placeholder': {
    color: '#777',
  },
  '&:focus-within': {
    backgroundColor: '#3a3a3a',
  },
});
export const Scroll = styled(Box)({
  width: '100%',
  height: '90%',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'scroll',
  paddingRight: '1rem'

});
export const SendButton = styled(Button)({
  marginLeft: '16px',
  padding: '12px 24px',
  backgroundColor: '#28a745',
  borderRadius: '24px',
  color: 'white',
  fontWeight: 600,
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#218838',
  },
  '&:active': {
    backgroundColor: '#1e6c2f',
  },
});


