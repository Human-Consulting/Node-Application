import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const BackCentral = styled(Box)({
    width: 'calc(100% - 2rem)',
    height: '100%',
    display: 'flex',
    overflow: 'hidden',
    flexDirection: 'row',
    gap: '1rem'
});

export const DoneContainer = styled(Box)({
    padding: '1rem',
    borderRadius: '10px',
    flex: 1,
    height: '100%',
    background: "#1d1d1d",
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
    height: '500px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    width: '100%'

});

export const TarefaMinimizada = styled(Box)({
    width: '125px',
    height: '50px',
    background: "blue",

});

