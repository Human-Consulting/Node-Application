import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const PrincipalContainerStyled = styled(Box)({
    flex: 1,
    backgroundColor: 'rgb(13, 13, 13)',
    display: 'flex',
    flexDirection: 'column',
});
export const HeaderContent = styled(Box)({
    position: 'relative',
    width: '100%',
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '2rem 1rem',
    justifyContent: 'space-between',
});
export const MidleCarrousel = styled(Box)({
    overflowX: 'hidden',
    overflowY: 'auto',
    height: '400px',
    minHeight: '400px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '3rem',
    padding: '0rem 2rem 5rem 1rem',

});
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
    color: '#fff'
})
