import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const TaskBody = styled(Box)(({ theme }) => ({
  width: '100%',
  overflow: 'scroll',
  overflowY: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  padding: '1.5rem',
  zIndex: 2,
  gap: '1rem',
  color: theme.palette.text.primary,
  // background: theme.palette.background.default,

  '&::-webkit-scrollbar': {
    height: '7px',
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.background.paper,
    borderRadius: '4px',
    zIndex: 5,
  },
  '&::-webkit-scrollbar-thumb': {
    background: theme.palette.divider,
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: theme.palette.grey[600],
  },
}));

export const SprintBody = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'start',
  gap: '5rem',
  height: '90%',
  color: theme.palette.text.primary,
  // background: theme.palette.background.default,
}));
