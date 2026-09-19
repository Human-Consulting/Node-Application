import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const UsuariosBody = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  background: theme.palette.background.default,
  // overflow: 'scroll',
  // scrollSnapType: 'x mandatory',
  boxSizing: 'padding-box' as any, // eslint-disable-line @typescript-eslint/no-explicit-any -- not a standard CSS value, kept for parity with the original untyped styles
  position: 'relative',
  paddingInline: '1.5rem',
  // '&::-webkit-scrollbar': {
  //   width: '0px',
  // },
}));
