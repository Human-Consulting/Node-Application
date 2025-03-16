import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const PrincipalContainerStyled = styled(Box)({
    height: '100%',
    flex: 1,
    backgroundColor: 'rgb(13, 13, 13)',
    display: 'flex',
    flexDirection: 'column',
});
export const HeaderContent = styled(Box)({
    width: '100%',
    height: '400px',
    background: ' linear-gradient(0deg, rgb(13, 13, 13) 0%, #196a9660 60%, rgb(13, 13, 13) 98%)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '2rem 1rem',
    justifyContent: 'space-between'


});
export const MidleCarrousel = styled(Box)({
    overflowY: 'scroll',
    height: '600px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '3rem',
    padding: '0rem 2rem',

});
export const InputSearch = styled('input')({
    flex: 1,
    height: '42px',
    paddingLeft: '8px',
    border: '1px solid #fff',
    borderRadius: '5px',
    color: '#fff'
});

export const ButtonFilter = styled('button')({
    width: '100px',
    height: '42px',
    backgroundColor: '#ffffff73',
    color: '#fff',
    padding: '2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid white',
    gap: '4px'
});

export const TituloHeader = styled('h1')({

    fontFamily: "Bebas Neue",
    fontWeight: 400,
    fontSize: '75px',
    color: '#fff'

      
})
