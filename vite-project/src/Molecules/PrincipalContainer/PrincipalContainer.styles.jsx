import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const PrincipalContainerStyled = styled(Box)(({ theme }) => ({
    flex: 1,
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
}));

export const HeaderContent = styled(Box)(({ theme }) => ({
    position: 'relative',
    height: '30%',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '1rem',
    justifyContent: 'space-between',
    color: theme.palette.iconPrimary,
}));

export const MidleCarrousel = styled(Box)(({ theme }) => ({
    overflowX: 'hidden',
    overflowY: 'auto',
    height: '70%',
    padding: '1rem 1rem 2rem 1rem',
    scrollBehavior: 'smooth',

    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
        background: theme.palette.custom.scrollbar,
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: theme.palette.custom.scrollbarHover,
    },
}));

export const CardsList = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '3rem',
}));

export const InputSearch = styled('input')(({ theme }) => ({
    flex: 1,
    height: '42px',
    paddingLeft: '8px',
    border: 'none',
    borderRadius: '5px',
    color: theme.palette.iconPrimary,
    backgroundColor: theme.palette.custom.sidebarItem,
    outline: 'none',

    '::placeholder': {
        color: theme.palette.custom.textSecondary,
    },
}));

export const ButtonFilter = styled('button')(({ theme }) => ({
    width: '100px',
    height: '42px',
    backgroundColor: theme.palette.custom.sidebarItem,
    color: theme.palette.iconPrimary,
    padding: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: '0.2s',

    '&:hover': {
        backgroundColor: theme.palette.custom.sidebarItemHover,
    },
}));

export const TituloHeader = styled('h1')(({ theme }) => ({
    position: 'relative',
    zIndex: '6',
    fontFamily: "Bebas Neue",
    fontWeight: 400,
    fontSize: '70px',
    color: theme.palette.iconPrimary,
}));
