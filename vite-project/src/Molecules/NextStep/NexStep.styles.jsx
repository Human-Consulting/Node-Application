import { Box, styled } from "@mui/material";

export const ContainerStep = styled(Box)({
    height: '100%',
    flex: 1,
    backgroundColor: 'rgb(0, 0, 0)',
    display: 'flex',
    flexDirection:  'column',
    // gap: '0.5rem'
});

export const ContainerSide = styled(Box)({
    // width: '100%',
    height: '60%',
    // flex: 1,
    backgroundColor: 'rgb(13, 13, 13)',
    display: 'flex',
});
export const ContainerFooter = styled(Box)({
    height: '40%',
    width: '100%',
    backgroundColor: 'rgb(13, 13, 13)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});
export const CardSprint = styled(Box)({
    height: '50px',
    width: '150px',
    borderRadius: '5px',
    backgroundColor: 'rgb(0, 121, 242)',
    display: 'flex',
});
export const MidleCarrouselNext = styled(Box)({
    overflowY: 'scroll',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '3rem',
    padding: '0rem 2rem',

});