import { styled } from "@mui/material";

export const BoxBody = styled('div')(({ inclui, finalizado }) => ({
    width: '100%',
    minWidth: '250px',
    maxWidth: '400px',
    height: '250px',
    minHeight: '225px',
    background: '#1D1D1D',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    borderRadius: '10px',
    position: 'relative',
    marginTop: '1rem',
    cursor: 'pointer',
    border: `solid ${inclui ? 'white' : 'transparent'} 2px`,
    opacity: finalizado ? 0.25 : 1,
    transition: "opacity 0.3s ease"

}));

export const StatusCircle = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '100px',
    height: '42px',
    width: '42px',
    position: 'absolute',
    right: '-34px',
    top: '-14px',
    right: '0',
    top: '0',
    zIndex: 10
})
export const Title = styled('p')({
    fontWeight: 500,
    fontSize: '16px',
    color: '#fff',
    width: '70%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
})
export const Subtitle = styled('p')({
    fontWeight: 300,
    fontSize: '14px',
    color: '#fff',
    width: 'auto',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
})

export const HeaderCard = styled('div')({
    height: '50%',
    width: '100%',
    backgroundColor: '#1d1d1d',
    zIndex: '6',
    borderRadius: '10px 10px 0px 0px',
    overflow: 'hidden',
    backgroundSize: 'cover'
})

export const BodyCard = styled('div')({
    height: '60%',
    width: '100%',
    zIndex: '30',
    padding: '0.5rem',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
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


