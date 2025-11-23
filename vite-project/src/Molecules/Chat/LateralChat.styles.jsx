import { Box, Button, InputBase } from '@mui/material';
import { styled } from '@mui/system';

export const LateralMessage = styled(Box)({
    width: '25%',
    height: '100%',
    background: '#0d0d0d',
    display: 'flex',
    flexDirection: 'column',
    borderRight: '1px solid #2e2e2e',
    padding: '0.5rem',
    gap: '1rem',
    zIndex: 6
});

export const LateralHeader = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '1rem',
});

export const ItemHeader = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
});

export const LateralList = styled(Box)({
    overflowY: 'auto',
    flex: 1,
    paddingInline: '0.5rem',
    width: '100%',
    boxSizing: 'border-box',

    '&::-webkit-scrollbar': {
        width: '4px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#888',
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#aaa',
    },
});

export const ContactItem = styled(Box)(({ active }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.6rem 1rem',
    borderRadius: '10px',
    cursor: 'pointer',
    border: active ? '1px solid #3f5a88' : '1px solid transparent',
    transition: 'all 0.2s ease',
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
    '&:hover': {
        backgroundColor: '#333',
    },
}));
