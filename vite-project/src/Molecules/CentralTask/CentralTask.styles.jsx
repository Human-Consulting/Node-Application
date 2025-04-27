import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const BackCentral = styled(Box)({
    width: 'calc(100% - 2rem)',
    height: '100%',
    background: "#0D0D0D",
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'column',
    paddingInline: '1.5rem',
    paddingBottom: '1.5rem',
});

export const TituloHeader = styled('h1')({
    position: 'relative',
    zIndex: '6',
    fontFamily: "Bebas Neue",
    fontWeight: 400,
    fontSize: '75px',
    color: '#fff',
})

export const MidleCarrousel = styled(Box)({
    marginTop: '50px',
    overflowY: 'scroll',
    height: '550px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gap: '1.5rem',
    padding: '0rem',
    width: '100%'

});

export const TarefaMinimizada = styled(Box)({
    width: '125px',
    height: '50px',
    background: "blue",

});

