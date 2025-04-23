import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const TaskBody = styled(Box)({
  width: '100%',
  height: '100%',
  background: "#0d0d0d",
  overflow: 'scroll',
  overflowY: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  paddingInline: '1.5rem',

  '&::-webkit-scrollbar': {
    height: '16px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#1a1a1a',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#888',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#aaa',
  },
});

export const SprintBody = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  overflow: 'none',
  // scrollSnapType: 'x mandatory',
  boxSizing: 'padding-box',
  paddingInline: '200px',
  marginTop: '125px',
})