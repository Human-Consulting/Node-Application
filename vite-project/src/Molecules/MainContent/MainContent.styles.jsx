import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const BoxAltertive = styled(Box)(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  flexDirection: 'row',
  gap: '0.5rem',
  overflow: 'hidden',
}));
