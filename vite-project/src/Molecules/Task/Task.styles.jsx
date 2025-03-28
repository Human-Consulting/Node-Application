import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const TaskBody = styled(Box)({
    width: '100%',
    height: '100%',
    background: "#0d0d0d",
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'scroll',
    scrollSnapType: 'x mandatory',
    boxSizing: 'padding-box',
    paddingLeft: '450px',
    position: 'relative',
    '&::-webkit-scrollbar': {
        width: '0px',
      },
    

});
