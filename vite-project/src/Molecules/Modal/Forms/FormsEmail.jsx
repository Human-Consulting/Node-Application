import { useState } from "react";
import { Box, Button, TextField, Stack } from "@mui/material";
import { inputStyle } from "./Forms.styles.jsx";
import { Send } from "@mui/icons-material";
import {
  getIdUsuario,
  enviarCodigo,
} from "../../../Utils/Cruds/CrudsUsuario.jsx";

// Adiciona fechar como prop

const FormsEmail = ({ fechar }) => {
  const [email, setEmailSend] = useState("");

  const [erros, setErros] = useState({});

  const handleEnvioEmail = async () => {
    if (!validarCampos()) return;
    setErros({});
    // Não busca id, não gera código, só envia email
    const body = { email };
    const envio = await enviarCodigo(body);
    if (envio && fechar) {
      fechar();
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validarCampos = () => {
    const novosErros = {};

    if (!email.trim()) novosErros.email = "Email é obrigatório";
    else if (!emailRegex.test(email))
      novosErros.email = "Formato de email inválido";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const removerErro = (campo) => {
    setErros((prevErros) => {
      const { [campo]: _, ...resto } = prevErros;
      return resto;
    });
  };

  return (
    <Box
      component="form"
      onSubmit={(e) => e.preventDefault()}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <TextField
        label="Email para envio do código"
        value={email}
        onChange={(e) => {
          removerErro("email");
          setEmailSend(e.target.value);
        }}
        fullWidth
        variant="outlined"
        autoComplete="off"
        InputLabelProps={{ style: inputStyle.label }}
        InputProps={{ style: inputStyle.input }}
        sx={inputStyle.sx}
        error={!!erros.email}
        helperText={erros.email}
      />

      <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleEnvioEmail}
          endIcon={<Send />}
          sx={{ flex: 1 }}
        >
          Enviar Código
        </Button>
      </Stack>
    </Box>
  );
};

export default FormsEmail;
