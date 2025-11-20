import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const Backdrop = styled(Box)({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
});

export const ModalContent = styled(Box)({
    position: 'absolute',
    width: '450px',
    backgroundColor: '#000',
    // backgroundColor: '#22272B',
    borderRadius: 8,
    paddingInline: 20,
    paddingBlock: '1rem',
    boxShadow: '0 0 20px rgba(0,0,0,0.3)',
    color: '#fff',
});

export const DragHandle = styled(Box)({
    width: 160,
    height: 10,
    backgroundColor: '#555',
    borderRadius: 5,
    margin: 'auto',
    cursor: 'move',
});