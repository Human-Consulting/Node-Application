import { Box} from '@mui/material';
import { styled } from '@mui/system';

export const ContainerBack = styled(Box)({
    width: 'calc(100% - 2rem)',
    // background: "#1D1D1D",
    // background: "#1D1D1D",
    borderRadius: '5px',
    position: 'relative',
    overflowY: 'hidden',
    display: 'flex',
    paddingInline: '1.5rem',
});

export const Title = styled('p')({
    fontWeight: 700,
    fontSize: '32px',
    color: '#dbdbdb',
})

export const KpiContainer = styled(Box)({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1000,
    justifyContent: 'space-between',
});

export const DashContainer = styled(Box)({
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '3rem',
});

export const TextDefault = styled('p')({
    fontSize: '24px',
    color: '#d4d4d4',
    fontWeight: 600
});

export const TextDefaultKpi = styled('p')({
    fontSize: '24px',
    color: '#d4d4d4',
    fontWeight: 600,
});

export const DashKpi = styled(Box)({
    height: 'calc(20% + 1rem)',
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    gridTemplateRows: '50% 50%',
    gap: '1rem',
});