import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const BackCentral = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    gap: '1rem',
    overflow: 'hidden',
    zIndex: 0,
    background: 'transparent', // mantém exatamente como estava
}));

export const DoneContainer = styled(Box)(({ theme }) => ({
    padding: '0.5rem',
    borderRadius: '12px',
    flex: 1,
    height: "fit-content",
    maxHeight: '100%',

    // Antes: "#0F0F0F"
    background: theme.palette.background.paper,

    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',

    // Antes: "#eee"
    color: theme.palette.custom.textPrimary,
}));

export const BodyTarefa = styled(Box)(({ theme }) => ({
    height: '100%',
    overflowY: 'auto',
    maxHeight: '800px',
    padding: '1rem',
    gap: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    scrollBehavior: 'smooth',

    // Antes: "#eee"
    color: theme.palette.custom.textPrimary,

    '&::-webkit-scrollbar': {
        width: '6px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
        // Antes: "#444"
        background: theme.palette.custom.scrollbar,
        borderRadius: '6px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        // Antes: "#666"
        background: theme.palette.custom.scrollbarHover,
    },
}));
