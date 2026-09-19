import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const ContainerBack = styled(Box)({
    width: '100%',
    // background: "#101010",
    borderRadius: '5px',
    position: 'relative',
    overflowY: 'hidden',
    display: 'flex',
    padding: '1.5rem',
});

export const ChartLateral = styled(Box)(({ theme }) => ({
    height: '50%',
    background: theme.palette.background.default,
    borderRadius: '20px',
    padding: '1rem',
    overflow: 'hidden'
}));

export const Title = styled('p')(({ theme }) => ({
    fontWeight: 700,
    fontSize: '32px',
    color: theme.palette.text.primary,
}))

export const KpiContainer = styled(Box)({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 100,
    justifyContent: 'space-between',
});

export const DashContainer = styled(Box)({
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
});

export const TextDefault = styled('p')(({ theme }) => ({
    fontSize: '24px',
    color: theme.palette.text.primary,
    fontWeight: 600
}));

export const TextDefaultKpi = styled('p')(({ theme }) => ({
    fontSize: '24px',
    color: theme.palette.text.primary,
    fontWeight: 600,
}));

export const DashKpi = styled(Box)({
    height: '30%',
    display: 'flex',
    gap: '1rem',
    flex: 1
});

export const Infos = styled(Box)(({ theme }) => ({
    background: theme.palette.background.default,
    padding: '0rem 1rem',
    borderRadius: '20px',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
}))
