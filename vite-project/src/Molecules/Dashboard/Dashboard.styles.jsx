import { Box} from '@mui/material';
import { styled } from '@mui/system';

export const ContainerBack = styled(Box)({
    width: 'calc(100% - 2rem)',
    height: '100%',
    background: "#1d1d1dc8",
    borderRadius: '5px',
    position: 'relative',
    overflowY: 'hidden',
    display: 'flex',
    gap: '2rem',
    flexDirection: 'column',
    paddingInline: '1.5rem',
});

export const Title = styled('p')({
    fontWeight: 700,
    fontSize: '32px',
    color: '#dbdbdb',
})

export const KpiContainer = styled(Box)({
    width: '100%',
    height: '90vh',
    borderRadius: '5px',
    position: 'relative',  
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
});

export const DashContainer = styled(Box)({
    width: '100%',
    height: '90vh',
    borderRadius: '5px',
    display: 'grid',
    gridTemplateColumns: '60% 50%',
    gridTemplateRows: '100%',
    gap: '3rem'
});

export const TextDefault = styled('p')({
    fontSize: '24px',
    color: '#d4d4d4',
    fontWeight: 600
});

export const TextDefaultKpi = styled('p')({
    fontSize: '24px',
    color: '#d4d4d4',
    fontWeight: 600
});

export const DashKpi = styled(Box)({
    width: '100%',
    height: 'calc(20% + 1rem)',
    borderRadius: '5px',
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    gridTemplateRows: '50% 50%',
    gap: '1rem'
});

export const BoxDetail = styled(Box)({
    width: 'calc(100% + 6rem)',
    height: 'calc(70% - 2rem)',
    background: '#0d0d0d',
    borderRadius: '20px',
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    justifyContent: 'center'
});