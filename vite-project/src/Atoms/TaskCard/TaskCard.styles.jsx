import { Box, styled } from "@mui/material";

export const TaskCardBody = styled(Box)({
    width: '500px',
    height: '650px',
    display: 'flex',
    flexDirection: 'column',
    background: "#1d1d1d",
    borderRadius: '10px',
    flexShrink: 0,
    scrollSnapAlign: 'center',
    margin: '0px 50px',
    alignItems: 'center',
    gap: '1rem'
    
    
});
export const TItleTarefa = styled('h2')({
    fontSize: '34px'
});

export const BodyTarefa = styled(Box)({
    height: 'calc(205px + 2rem)',
    width: '80%',
    gap: '2rem',
    display: 'flex',
    flexDirection: 'column',
    background: "#ff00000",
    overflowY: 'scroll',
    flexShrink: 0,
    scrollSnapType: 'y mandatory',
    alignItems: 'center',
    scrollBehavior: 'smooth',

    '&::-webkit-scrollbar': {
        width: '4px',
      },
    
    
    
});

export const NavTask = styled(Box)({
    height: '10%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    background: '#000',
    borderRadius: '10px 10px 0px 0px'
});