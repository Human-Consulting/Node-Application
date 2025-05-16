import { Box } from '@mui/material';
import { styled } from '@mui/system';


export const MessageBody = styled(Box)({
    minHeight: '50px',
    maxHeight: 'auto',
    background: '#eaeaea',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: '10px',
    padding:   '0.7rem',
    gap: '0.5rem'
  });

  export const MessageText = styled(Box)({
    width: '100%',
    minHeight: '50px',
    maxHeight: 'auto',
    color: '#000'
  });
