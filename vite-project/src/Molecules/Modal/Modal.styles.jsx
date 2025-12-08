import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const Backdrop = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)', // ✅ backdrop pode se manter assim
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 100,
}));

export const ModalContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '450px',
  backgroundColor: theme.palette.background.paper, // ✅ ERA FIXO (#000)
  borderRadius: 8,
  paddingInline: 20,
  paddingBlock: '1rem',
  boxShadow: '0 0 20px rgba(0,0,0,0.3)',
  color: theme.palette.text.primary, // ✅ ERA FIXO (#fff)
}));

export const DragHandle = styled(Box)(({ theme }) => ({
  width: 160,
  height: 10,
  backgroundColor: theme.palette.divider, // ✅ ERA FIXO (#555)
  borderRadius: 5,
  margin: 'auto',
  cursor: 'move',
}));
