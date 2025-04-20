import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const LateralNavBar = styled(Box)({
    width: '20%',
    height: '100%',
    background: '#0d0d0d',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',

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
    overflowX:'hidden'

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

export const SkipRigth = styled('button')({
    width: '42px',
    height: '42px',
    backgroundColor: '#1D1D1D',
    border: 'solid #DDD 1px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100px',
    position: 'absolute',
    top: '50%',
    right: '-5%',
    transform: 'translate(-50%, -50%)',
    zIndex: '100',
    cursor: 'pointer',      
    outline: 'none',          
    '&:focus': {
        outline: 'none' 
    }
});

export const SkipLeft = styled('button')({
    width: '42px',
    height: '42px',
    backgroundColor: '#1D1D1D',
    border: 'solid #DDD 1px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100px',
    position: 'absolute',
    top: '50%',
    left: '10%',
    transform: 'translate(-50%, -50%)',
    zIndex:  '100',
    cursor: 'pointer',
    '&:focus': {
        outline: 'none' 
    }

    
});