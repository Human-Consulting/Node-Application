import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const LateralNavBar = styled(Box)({
    width: '300px',
    minWidth: '300px',
    maxWidth: '350px',
    height: '100vh',
    backgroundColor: '#000000',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
});
export const DivisorOne = styled(Box)({
    width: '100%',
    height: '30%',
    backgroundColor: '#000',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    alignItems: 'start',
    justifyContent: 'center'
});

export const ChipZone = styled(Box)({
    width: '100%',
    height: '150px',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'start',
    justifyContent: 'center'

});
export const CardZone = styled(Box)({
    width: '100%',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    alignItems: 'start',
    paddingLeft: '0.5rem',

});
export const Title = styled('p')({
    fontWeight: 500,
    fontSize: '14px',
    color: '#fff',

})
export const DivisorTwo = styled(Box)({
    width: '100%',
    flex: '1',
    backgroundColor: '#0d0d0d',
    display: 'flex',
    flexDirection: 'column',
});
