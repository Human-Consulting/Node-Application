import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const BackCentral = styled(Box)({
    width: '100%',
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    gap: '1rem',
    overflow: 'hidden',
    zIndex: 0,
});

export const DoneContainer = styled(Box)({
    padding: '0.5rem',
    borderRadius: '10px',
    flex: 1,
    height: "fit-content",
    maxHeight: '100%',
    background: "#101010",
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
});

export const BodyTarefa = styled(Box)({
    height: '100%',
    overflowY: 'auto',
    maxHeight: '800px',
    padding: '0.5rem',
    padding: '1rem',
    gap: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    scrollBehavior: 'smooth',

    '&::-webkit-scrollbar': {
        width: '8px',
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