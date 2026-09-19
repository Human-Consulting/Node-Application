import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const PrincipalContainerStyled = styled(Box)(({ theme }) => ({
    flex: 1,
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
}));

export const HeaderContent = styled(Box)({
    position: 'relative',
    height: '30%',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '1rem',
    justifyContent: 'space-between',
});
export const MidleCarrousel = styled(Box)({
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
        background: '#888',
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: '#aaa',
    },
});

export const CardsList = styled(Box)({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '3rem',
})

export const InputSearch = styled('input')(({ theme }) => ({
    flex: 1,
    height: '42px',
    paddingLeft: '8px',
    border: 'none',
    borderRadius: '5px',
    color: theme.palette.text.primary
}));

export const ButtonFilter = styled('button')(({ theme }) => ({
    width: '100px',
    height: '42px',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px'
}));

export const TituloHeader = styled('h1')(({ theme }) => ({
    position: 'relative',
    zIndex: '6',
    fontFamily: "Bebas Neue",
    fontWeight: 400,
    fontSize: '70px',
    color: theme.palette.text.primary,
}))
