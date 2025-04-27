import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const TaskBody = styled(Box)({
  width: '100%',
  height: '100%',
  overflow: 'scroll',
  overflowY: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  paddingInline: '1.5rem',
  zIndex: 2,
  // background: '#0D0D0D',

  '&::-webkit-scrollbar': {
    height: '10px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#1a1a1a',
    borderRadius: '4px',
    zIndex: 5
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
  alignItems: 'start',
  overflow: 'none',
  boxSizing: 'padding-box',
  marginTop: '125px',
  paddingRight: '1.5rem',
})