import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const LateralNavBar = styled(Box)(({ theme }) => ({
    width: '20%',
    minWidth: '20%',
    backgroundColor: theme.palette.custom.sidebarItem,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    gap: '1rem'
}));

export const Section = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItens: 'center',
    flex: 1,
    width: '100%',
    backgroundColor: theme.palette.custom.sectionBackground,
    position: 'relative'
}));

export const Divisor = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItens: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: '10px',
    width: '80%',
    backgroundColor: theme.palette.custom.sectionInner,
}));

export const Title = styled('p')(({ theme }) => ({
    fontWeight: 500,
    fontSize: '16px',
    color: theme.palette.iconPrimary,
    textAlign: 'center'
}));

export const Slide = styled('div')(() => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    height: '100%',
    transition: 'transform 0.5s ease-in-out',
    transform: 'translateX(0)',
    scrollSnapType: 'x mandatory',
}));

export const SkipButton = styled('button')(({ theme, lado }) => ({
    width: '25px',
    height: '25px',
    padding: '0',
    backgroundColor: theme.palette.custom.buttonBackground,
    border: `solid ${theme.palette.custom.buttonBorder} 2px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100px',
    position: 'absolute',
    top: '50%',
    left: lado === 'esquerda' ? '0' : 'auto',
    right: lado === 'direita' ? '0' : 'auto',
    zIndex: '100',
    cursor: 'pointer',

    '&:focus': {
        outline: 'none',
    }
}));

export const KpiFinalizados = styled('div')(({ theme }) => ({
    width: '200px',
    height: '75px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.custom.kpiBackground,
    borderRadius: '10px',
}));
