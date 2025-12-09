import { Box, Button, InputBase } from '@mui/material';
import { styled } from '@mui/system';

export const TextInput = styled('input')(({ theme }) => ({
  width: '75%',
  height: '50px',
  color: theme.palette.text.primary,
  background: theme.palette.background.paper,
}));

export const ContainerGeral = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  background: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export const ContactAvatar = styled('img')({
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  marginRight: '12px',
  objectFit: 'cover',
  boxShadow: '0 0 4px rgba(0,0,0,0.7)',
});

export const ContactName = styled('span')(({ theme }) => ({
  fontSize: '1rem',
  userSelect: 'none',
  color: theme.palette.text.primary,
}));

export const BackChat = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto',
  scrollBehavior: 'smooth',
  background: theme.palette.background.default,
}));

export const Header = styled(Box)(({ theme }) => ({
  padding: '0.5rem',
  borderBottom: `1px solid ${theme.palette.borderPrimary}`,
  background: theme.palette.background.paper,
  position: 'sticky',
  top: 0,
  zIndex: 20,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: '1rem',
}));

export const HeaderContent = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
});

export const MessageWrapper = styled(Box)(({ sent, theme }) => ({
  maxWidth: '70%',
  marginBottom: '14px',
  display: 'flex',
  flexDirection: 'column',
  fontSize: '0.9rem',
  lineHeight: 1.3,
  alignSelf: sent ? 'flex-end' : 'flex-start',
  textAlign: sent ? 'right' : 'left',
  zIndex: 10,
  color: theme.palette.text.primary,
}));

export const MessageSender = styled('span')(({ theme }) => ({
  fontWeight: 600,
  marginBottom: '4px',
  color: theme.palette.text.secondary,
  userSelect: 'none',
}));

export const MessageBox = styled(Box)(({ sent, theme }) => ({
  borderRadius: '16px',
  backgroundColor: sent ? '#28a745' : theme.palette.background.cardBg,
  color: sent ? '#f0f0f0' : theme.palette.text.primary,
  boxShadow: '0 2px 6px rgb(0 0 0 / 0.25)',
  position: 'relative',
  wordBreak: 'break-word',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '12px 16px',
}));

export const MessageTime = styled('span')(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.text.secondary,
  marginTop: '2px',
  userSelect: 'none',
}));

export const MessageAvatar = styled('img')({
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  objectFit: 'cover',
  boxShadow: '0 0 6px rgba(0,0,0,0.6)',
});

export const ChatInputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  background: theme.palette.background.paper,
  zIndex: 10,
  margin: '1rem',
  borderRadius: '10px',
  border: `4px solid transparent`,

  '&:focus-within': {
    borderBottom: '4px solid #1A4D7A',
  },
}));

export const ChatInput = styled(InputBase)(({ theme }) => ({
  padding: '0.75rem',
  flex: 1,
  fontSize: '1rem',
  color: theme.palette.text.primary,
  '& .MuiInputBase-input::placeholder': {
    color: theme.palette.text.secondary,
  },
}));

export const SendButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  borderRadius: 0,
  color: theme.palette.text.primary,

  '&:hover': {
    backgroundColor: '#1A4D7A',
  },
}));

export const Scroll = styled(Box)(({ theme }) => ({
  width: '100%',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'scroll',
  zIndex: 10,

  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.custom.scrollbar,
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: theme.palette.custom.scrollbarHover,
  },
}));
