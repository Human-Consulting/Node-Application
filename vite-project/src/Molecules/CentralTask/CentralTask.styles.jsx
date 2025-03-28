import { Box} from '@mui/material';
import { styled } from '@mui/system';

export const BackCentral = styled(Box)({
    maxWidth: '100%',
    height: '100%',
    background: "#0d0d0d",
    display: 'flex',
    overflow: 'hidden',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '0 1rem'
    
});

export const TituloHeader = styled('h1')({
    position: 'relative',
    zIndex: '6',
    fontFamily: "Bebas Neue",
    fontWeight: 400,
    fontSize: '75px',
    color: '#fff'

      
})

export const MidleCarrousel = styled(Box)({
    overflowY: 'scroll',
    height: '550px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '3rem',
    padding: '0rem',
    width: '100%'

});

export const TarefaMinimizada = styled(Box)({
    width: '125px',
    height: '50px',
    background: "blue",
    
});

