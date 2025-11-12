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

export const ChartLateral = styled(Box)({
    height: '50%',
    background: '#101010',
    borderRadius: '20px',
    padding: '1rem',
    overflow: 'hidden'
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
    zIndex: 100,
    justifyContent: 'space-between',
});

export const DashContainer = styled(Box)({
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
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
    height: '30%',
    display: 'flex',
    gap: '1rem',
    flex: 1
});

export const Infos = styled(Box)({
    background: '#101010',
    padding: '0rem 1rem',
    borderRadius: '20px',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
})