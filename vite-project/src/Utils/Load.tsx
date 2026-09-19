import { Stack, Box, CircularProgress } from '@mui/material'
import Shader from '../Molecules/Shader/Shader'

export const Load = () => {
    return (
        <Stack
              sx={{
                alignItems: "center",
                justifyContent: "center",
                width: "100vw",
                height: "100vh",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: 0,
                }}
              >
                <Shader index={0} />
              </Box>
              <Stack alignItems="center" spacing={2} sx={{ zIndex: 1 }}>
                <CircularProgress size={50} />
                <h1 style={{ textAlign: 'center' }}>Só um momento, <br /> estamos organizando tudo pra você...</h1>
              </Stack>
            </Stack>
    )
}
