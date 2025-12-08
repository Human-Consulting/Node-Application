import { Stack, Box, CircularProgress, useTheme } from '@mui/material'
import Shader from '../Molecules/Shader/Shader'

export const Load = ({ color1, color2, color3, animate }) => {
  const theme = useTheme() // ✅ pega o tema ativo

  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        position: "relative",
        backgroundColor: theme.palette.background.default, // ✅ fundo responde ao tema
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
        <Shader
          animate={animate}
          color1={color1}
          color2={color2}
          color3={color3}
          index={0}
        />
      </Box>

      <Stack
        alignItems="center"
        spacing={2}
        sx={{
          zIndex: 1,
          color: theme.palette.text.primary, // ✅ texto reage ao tema
        }}
      >
        <CircularProgress
          size={50}
          color="primary" // ✅ azul no escuro, verde pastel no claro (via theme)
        />

        <h1
          style={{
            textAlign: 'center',
            fontWeight: 500,
            margin: 0,
            color: 'inherit' // ✅ herda do tema
          }}
        >
          Só um momento, <br />
          estamos organizando tudo pra você...
        </h1>
      </Stack>
    </Stack>
  )
}
