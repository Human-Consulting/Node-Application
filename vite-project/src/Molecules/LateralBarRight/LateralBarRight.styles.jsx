import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const LateralNavBar = styled(Box)({
    width: '20%',
    minWidth: '20%',
    backgroundColor: '#0d0d0d',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    gap: '1rem'
});

export const Section = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItens: 'center',
    flex: 1,
    width: '100%',
    position: 'relative'
});

export const Divisor = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItens: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: '10px',
    width: '80%',
})

export const Title = styled('p')({
    fontWeight: 500,
    fontSize: '16px',
    color: '#fff',
    textAlign: 'center'
});

export const Slide = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyContent: 'start',
    height: '100%',
    transition: 'transform 0.5s ease-in-out',
    transform: 'translateX(0)',
    scrollSnapType: 'x mandatory',
});

export const SkipButton = styled('button')(({ lado }) => ({
    width: '25px',
    height: '25px',
    padding: '0',
    backgroundColor: '#1D1D1D',
    border: 'solid #DDD 2px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100px',
    position: 'absolute',
    top: '50%',
    left: lado == 'esquerda' ? '0' : 'auto',
    right: lado == 'direita' ? '0' : 'auto',
    zIndex: '100',
    cursor: 'pointer',
    '&:focus': {
        outline: 'none'
    }
}));

export const KpiFinalizados = styled('div')({
    width: '200px',
    height: '75px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d4d4d4',
    borderRadius: '10px',
});
