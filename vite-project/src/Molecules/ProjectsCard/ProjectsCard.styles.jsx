import { styled } from "@mui/material";

export const BoxBody = styled('div')({
    width: '100%',
    height: '202px',
    background: '#1d1d1d',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '0.5rem',
    borderRadius: '10px',
    flexShrink: 0,
    position: 'relative',
    marginTop: '2rem',
    cursor: 'pointer'
});

export const StatusCircle = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '100px',
    height: '42px',
    width: '42px',
    position: 'absolute',
    right: '-32px',
    top: '-14px'

})
export const Title = styled('p')({
    fontWeight: 500,
    fontSize: '16px',
    color: '#fff',

})
export const Subtitle = styled('p')({
    fontWeight: 300,
    fontSize: '14px',
    color: '#fff',

})
export const HeaderCard = styled('div')({
    height: '50%',
    width: '100%',
    backgroundColor: '#1d1d1d',
    zIndex: '30',
    position: 'absolute',
    top: '0%',
    right: '0%',
    borderRadius: '10px 10px 0px 0px',
    overflow: 'hidden',
    backgroundSize: 'cover'
})

export const BodyCard = styled('div')({
    height: '65%',
    width: '100%',
    backgroundColor: '#1d1d1d',
    zIndex: '30',
    position: 'absolute',
    top: '60%',
    right: '0%',
    padding: '0.5rem',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
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
      
      
      