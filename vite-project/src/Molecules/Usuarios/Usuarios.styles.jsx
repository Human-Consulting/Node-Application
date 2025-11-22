import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const UsuariosBody = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  background: theme.palette.mode === 'dark' ? "#0D0D0D" : "#f5f5f5",
  boxSizing: 'border-box',
  position: 'relative',
  paddingInline: '1.5rem',
  color: theme.palette.iconPrimary
}));
