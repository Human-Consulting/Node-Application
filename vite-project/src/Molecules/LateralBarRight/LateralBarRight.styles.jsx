import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const LateralNavBar = styled(Box)({
    width: '300px',
    minWidth: '300px',
    maxWidth: '350px',
    background: '#0d0d0d',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    zIndex: 5,
});

export const MiniCarrousel = styled('div')({
    width: '250px',
    height: '300px',
    display: 'flex',
    flexDirection: 'row',
    gap: '3rem',
    alignItems: 'center',
    justifyContent: 'start',
    position: 'relative',
    flexShrink: '0',
    scrollbarColor: 'hidden',
    overflowX:'hidden',
});

export const Slide = styled('div')({
    width: '100%',
    display: 'flex',
    gap: '3rem',
    paddingLeft: '1.5rem',
    flexShrink: '0',
    scrollbarColor: 'hidden',
    transition: 'transform 0.5s ease-in-out',
    transform: 'translateX(0)',

});
export const KpiFinalizados = styled('div')({
    width: '200px',
    height: '75px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d4d4d4',
    borderRadius: '10px',
    

});

export const SkipButton = styled('button')(({ lado }) => ({
    width: '35px',
    height: '35px',
    padding: '0',
    backgroundColor: '#1D1D1D',
    border: 'solid #DDD 2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100px',
    position: 'absolute',
    top: '45%',
    left: lado == 'esquerda' ? '3%' : 'auto',
    right: lado == 'direita' ? '3%' : 'auto',
    zIndex:  '100',
    cursor: 'pointer',
    '&:focus': {
        outline: 'none' 
    }
}));