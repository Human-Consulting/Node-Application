import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const PrincipalContainerStyled = styled(Box)({
    flex: 1,
    backgroundColor: '#0D0D0D',
    display: 'flex',
    flexDirection: 'column',
});

export const HeaderContent = styled(Box)({
    position: 'relative',
    width: '100%',
    height: '300px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '1rem',
    justifyContent: 'space-between',
});
export const MidleCarrousel = styled(Box)({
    overflowX: 'hidden',
    overflowY: 'auto',
    height: '400px',
    minHeight: 'fit-content',
    minHeight: '400px',
    padding: '1rem 1rem 2rem 1rem',
    scrollBehavior: 'smooth',
    zIndex: 6,

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

export const InputSearch = styled('input')({
    flex: 1,
    height: '42px',
    paddingLeft: '8px',
    border: 'none',
    borderRadius: '5px',
    color: '#fff'
});

export const ButtonFilter = styled('button')({
    width: '100px',
    height: '42px',
    backgroundColor: '#1d1d1d',
    color: '#fff',
    padding: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px'
});

export const TituloHeader = styled('h1')({
    position: 'relative',
    zIndex: '6',
    fontFamily: "Bebas Neue",
    fontWeight: 400,
    fontSize: '70px',
    color: '#fff',
})
