import { Box, styled } from "@mui/material";

export const TaskCardBody = styled(Box)(({ theme }) => ({
    width: '35%',
    display: 'flex',
    flexDirection: 'column',
    background: theme.palette.background.cardBg,      // antes: #101010
    borderRadius: '10px',
    flexShrink: 0,
    scrollSnapAlign: 'center',
    alignItems: 'center',
    gap: '2rem',
    padding: '1rem',
    maxHeight: '100%',
    position: 'relative',
    color: theme.palette.text.primary,              // garante textos corretos
}));

export const TitleTarefa = styled('h2')(({ theme }) => ({
    fontSize: '34px',
    color: theme.palette.text.primary,
}));

export const BodyTarefa = styled(Box)(({ theme }) => ({
    width: 'calc(100% + 1rem)',
    overflowY: 'auto',
    gap: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    scrollBehavior: 'smooth',
    paddingInline: '1rem',
    color: theme.palette.text.primary,

    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: theme.palette.background.paper,   // antes: transparente
    },
    '&::-webkit-scrollbar-thumb': {
        background: theme.palette.divider,            // antes: #888
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: theme.palette.text.secondary,     // antes: #aaa
    },
}));

export const NavTask = styled(Box)(({ theme }) => ({
    height: '50px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.primary,
}));
