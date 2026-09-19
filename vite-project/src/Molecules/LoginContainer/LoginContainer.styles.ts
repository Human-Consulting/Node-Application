import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const BackgroundLogin = styled(Box)({
    width: '400px',
    height: '300px',
    background: "red",
    display: 'flex',
    flexDirection: 'column'

});
export const IconeSample = styled(Box)({
    width: '50px',
    height: '50px',
    background: "white",
    borderRadius: '100%'

});
export const ContainerFrase = styled(Box)({
    flex: 1,
    height: '95vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    zIndex: '30',
    alignItems: 'center',
    paddingTop: '5rem'


});