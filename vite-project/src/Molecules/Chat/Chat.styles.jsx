import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const BackChat = styled(Box)({
  width: '70%',
  height: '100vh',
  background: '#1f1f1f',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  padding: '1rem',
  overflow: 'hidden'
});
export const Scroll = styled(Box)({
    width: '100%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll'
  });
  export const LateralMessage = styled(Box)({
    width: '30%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'scroll',
    background: '#1f1f1f',

  });

  export const ContainerGeral = styled(Box)({
    width: '70vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
  });
  
  

export const TextInput = styled('input')({
    width: '75%',
    height: '50px',
    padding: '1rem'
 
  });
  

