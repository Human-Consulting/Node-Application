import {styled } from "@mui/material";

export const BoxBody = styled('div')({
    width: 'calc(90%)',
    height: '225px',
    background: '#1d1d1d',
    background: '#000',
    // background: '#22272B',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
    flexShrink: 0,
    position: 'relative',
    alignItems: 'center',
    padding: '0.5rem'
});

export const Title = styled('p')({
    fontWeight: 500,
    fontSize: '20px',
    color: '#fff'

})
export const Subtitle = styled('p')({
    fontWeight: 300,
    fontSize: '14px',
    color: '#fff'
})

export const BodyCard = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
})
export const ProgressBar = styled('div')({
    height: '10px',
    width: '70%',
    backgroundColor: '#474747',
    borderRadius: '2px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start'
    
})

export const Progress = styled('div')({
    height: '10px',
    backgroundColor: '#36518c',
    borderRadius: '2px',
})
      