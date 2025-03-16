import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const LateralNavBar = styled(Box)({
    width: '25%',
    height: '100%',
    backgroundColor: '#000000',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'

});
export const DivisorOne = styled(Box)({
    width: '100%',
    height: '20%',
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
    flex: '300px',
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    alignItems: 'start',
    paddingLeft: '0.5rem'

});
export const Title = styled('p')({
    fontWeight: 500,
    fontSize: '18px',
    color: '#fff',

})
export const DivisorTwo = styled(Box)({
    width: '100%',
    flex: '1',
    backgroundColor: '#0d0d0d',
    display: 'flex',
    flexDirection: 'column'

});
