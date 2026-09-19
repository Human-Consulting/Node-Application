import { Box, Button, TextField } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { styled } from '@mui/system';

export const LoginBack = styled(Box)(({ theme }) => ({
  width: '30vw',
  height: '95vh',
  background: alpha(theme.palette.background.paper, 0.78),
  backdropFilter: 'blur(10px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: '5px',
  position: 'relative',
  zIndex: '30',
  paddingInline: '2rem',
  paddingBlock: '4rem',
}));

export const LoginTitulo = styled('h2')(({ theme }) => ({
  fontFamily: 'Oswald, sans-serif',
  fontWeight: 400,
  fontSize: '42px',
  lineHeight: '46px',
  color: theme.palette.text.primary
}));

export const Container = styled(Box)({
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  padding: '1rem'
});

export const InputMinha = styled(TextField)(({ theme }) => ({
  '& label.Mui-focused': {
    color: theme.palette.text.primary,
  },
  "&::placeholder": {
    color: theme.palette.text.secondary
  },
  color: theme.palette.text.primary,


  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: '#B2BAC2',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6F7E8C',
    },
  },
}));

export const ButtonMeu = styled(Button)({
  background: '#1c8bcb',
  height: '56px',
  color: '#fff'

});