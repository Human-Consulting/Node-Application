import { Box, Button, TextField } from '@mui/material';
import { styled } from '@mui/system';

export const LoginBack = styled(Box)({
    width: '30vw',
    height: '95vh',
    background: "#1d1d1dc8",
    backdropFilter: 'blur(10px)',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '5px',
    position: 'relative',
    zIndex: '30',
    padding: '2rem',
    gap: '3.5rem',
});
export const LoginTitulo = styled('h2')({
    fontFamily: 'Oswald, sans-serif',
    fontWeight: 400,
    fontSize: '42px',
    lineHeight: '46px',
    color: '#fff'
});
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

export const InputMinha = styled(TextField)({
    '& label.Mui-focused': {
      color: '#ffffff',
    },
        "&::placeholder": {
          color: "gray"
        },
        color: "white",
     
  
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
  });

export const ButtonMeu = styled(Button)({
    background: '#1c8bcb',
    height: '56px',
    color: '#fff'

});