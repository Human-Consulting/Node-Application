import { Box, Button, InputBase } from '@mui/material';
import { styled } from '@mui/system';

export const TextInput = styled('input')({
  width: '75%',
  height: '50px',
  padding: '1rem'
});

export const ContainerGeral = styled(Box)({
  width: '100%',
  height: '100%',
  display: 'flex',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
});

export const LateralMessage = styled(Box)({
  width: '25%',
  height: '100%',
  background: '#0d0d0d',
  display: 'flex',
  flexDirection: 'column',
  borderRight: '1px solid #2e2e2e',
  boxShadow: '2px 0 8px rgba(0,0,0,0.3)',
});

export const ContactItem = styled(Box)(({ active }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '0.6rem 1rem',
  margin: '0.3rem 0.8rem',
  borderRadius: '10px',
  cursor: 'pointer',
  border: active ? '1px solid #3f5a88' : '1px solid transparent',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#333',
    border: '1px solid #3f5a88',
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
  overflowY: 'auto',
  scrollBehavior: 'smooth',
});

export const Header = styled(Box)({
  padding: '1rem 1rem',
  borderBottom: '1px solid #333',
  background: "linear-gradient(180deg, #151515 0%, #0d0d0d 100%)",
  position: 'sticky',
  top: 0,
  zIndex: 20,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '1rem'
});

export const ItemHeader = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.75rem'
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
  zIndex: 10
}));

export const MessageSender = styled('span')({
  fontWeight: 600,
  marginBottom: '4px',
  color: '#a1a1a1',
  userSelect: 'none',
  zIndex: 10
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
  zIndex: 10
}));

export const MessageTime = styled('span')({
  fontSize: '0.75rem',
  color: '#777',
  marginTop: '2px',
  userSelect: 'none',
  zIndex: 10
});

export const MessageAvatar = styled('img')({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  objectFit: 'cover',
  boxShadow: '0 0 6px rgba(0,0,0,0.6)',
  zIndex: 10
});

export const ChatInputContainer = styled(Box)({
  display: 'flex',
  background: "linear-gradient(180deg, #151515 0%, #0d0d0d 100%)",
  zIndex: 10,
  borderTop: '1px solid #333',
});

export const ChatInput = styled(InputBase)({
  flex: 1,
  padding: '12px 16px',
  fontSize: '1rem',
  color: '#eee',
  '& .MuiInputBase-input::placeholder': {
    color: '#FFF',
  }
});
export const Scroll = styled(Box)({
  width: '100%',
  height: '90%',
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'scroll',
  paddingRight: '1rem',
  zIndex: 10,
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#aaa',
  },

});
export const SendButton = styled(Button)({
  padding: '12px 24px',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: '#1A4D7A',
  },
  '&:active': {
    backgroundColor: '#1e6c2f',
  },
});


