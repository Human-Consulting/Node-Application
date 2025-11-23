import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const BackCentral = styled(Box)({
    width: '100%',
    height: '100%',
    display: 'flex',
    gap: '1rem',
    overflow: 'hidden',
    zIndex: 0,
    background: 'transparent',
});

export const DoneContainer = styled(Box)({
    padding: '0.5rem',
    borderRadius: '12px',
    flex: 1,
    height: "fit-content",
    maxHeight: '100%',
    background: "#0F0F0F",
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    color: '#eee',        // <<< FONT COLOR PADRÃO
});

export const BodyTarefa = styled(Box)({
    height: '100%',
    overflowY: 'auto',
    maxHeight: '800px',
    padding: '1rem',
    gap: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    scrollBehavior: 'smooth',
    color: '#eee',        // <<< FONT COLOR PADRÃO

    '&::-webkit-scrollbar': {
        width: '6px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#444',
        borderRadius: '6px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#666',
    },
});
