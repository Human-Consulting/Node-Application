import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const ContainerBack = styled(Box)(({ theme }) => ({
    width: '100%',
    borderRadius: '5px',
    position: 'relative',
    overflowY: 'hidden',
    display: 'flex',
    padding: '1.5rem',
    backgroundColor: theme.palette.custom.background,
}));

export const ChartLateral = styled(Box)(({ theme }) => ({
    height: '50%',
    backgroundColor: theme.palette.custom.card,
    borderRadius: '20px',
    padding: '1rem',
    overflow: 'hidden'
}));

export const Title = styled('p')(({ theme }) => ({
    fontWeight: 700,
    fontSize: '32px',
    color: theme.palette.custom.textPrimary,
}));

export const KpiContainer = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 100,
    justifyContent: 'space-between',
    color: theme.palette.custom.textPrimary,
}));

export const DashContainer = styled(Box)(({ theme }) => ({
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    color: theme.palette.custom.textPrimary,
}));

export const TextDefault = styled('p')(({ theme }) => ({
    fontSize: '24px',
    fontWeight: 600,
    color: theme.palette.custom.textPrimary,
}));

export const TextDefaultKpi = styled('p')(({ theme }) => ({
    fontSize: '24px',
    fontWeight: 600,
    color: theme.palette.custom.textPrimary,
}));

export const DashKpi = styled(Box)(({ theme }) => ({
    height: '30%',
    display: 'flex',
    gap: '1rem',
    flex: 1
}));

export const Infos = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.custom.card,
    padding: '0rem 1rem',
    borderRadius: '20px',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
}));
