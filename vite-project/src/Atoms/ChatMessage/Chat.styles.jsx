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
  