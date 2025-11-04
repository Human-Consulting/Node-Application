import { Box, styled } from "@mui/material";

export const TaskCardBody = styled(Box)({
    width: '35%',
    display: 'flex',
    flexDirection: 'column',
    background: "#101010",
    borderRadius: '10px',
    flexShrink: 0,
    scrollSnapAlign: 'center',
    alignItems: 'center',
    gap: '2rem',
    padding: '1rem',
    maxHeight: '100%'
});
export const TitleTarefa = styled('h2')({
    fontSize: '34px'
});

export const BodyTarefa = styled(Box)({
    width: 'calc(100% + 1rem)',
    overflowY: 'auto',
    gap: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    scrollBehavior: 'smooth',
    paddingInline: '1rem',

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
});