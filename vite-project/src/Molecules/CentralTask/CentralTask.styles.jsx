import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const BackCentral = styled(Box)({
    width: '100%',
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    gap: '1rem',
    overflow: 'scroll',
    overflowY: 'hidden',
    zIndex: 2,
});

export const DoneContainer = styled(Box)({
    padding: '1rem',
    borderRadius: '10px',
    flex: 1,
    height: "fit-content",
    background: "#101010",
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
});

export const BodyTarefa = styled(Box)({
    height: '100%',
    width: 'calc(100%)',
    overflowY: 'auto',
    maxHeight: '800px',
    padding: '1rem 0rem',
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

export const NavTask = styled(Box)({
    height: '50px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid red 1px'
});