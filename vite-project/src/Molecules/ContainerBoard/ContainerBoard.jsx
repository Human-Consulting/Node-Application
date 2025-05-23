import { Alert, Divider, Snackbar, Stack } from "@mui/material";
import { ButtonMeu, LoginBack, LoginTitulo, InputMinha } from "./ContainerBoard.styles";
import { useNavigate } from "react-router";
import { handleSubmitLogin } from "../../Utils/UsePost";
import React from "react";

const ContainerBoard = () => {
  const navigate = useNavigate();
  const [responseMessage, setResponseMessage] = React.useState('');
  const [responseSucess, setResponseSucess] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [emailLogin, setEmailLogin] = React.useState("");
  const [senhaLogin, setSenhaLogin] = React.useState("");

  return (
    <LoginBack>
      <Snackbar open={Boolean(responseMessage)} autoHideDuration={3000}>
        <Alert severity="error" variant="filled" sx={{ width: '100%' }}>
          {responseMessage}
        </Alert>
      </Snackbar>

      <Snackbar open={Boolean(responseSucess)} autoHideDuration={3000}>
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          {responseSucess}
        </Alert>
      </Snackbar>

      <Stack sx={{ gap: '0.5rem' }}>
        <LoginTitulo>
          Tenha um <b>planejamento</b> inteligente
        </LoginTitulo>
        <p>Seu projeto, nossa ajuda e seu resultado</p>
      </Stack>

      <Stack sx={{ gap: '0.7rem' }}>
        <p>Entre e tenha total controle de seus projetos</p>
        <Stack gap={{ gap: '1rem' }}>
          <InputMinha
            sx={{
              input: {
                color: 'white',
                "&::placeholder": {
                  opacity: 1,
                  color: 'white',
                },
              },
              label: { color: 'white' },
            }}
            label="E-mail"
            value={emailLogin}
            onChange={(e) => setEmailLogin(e.target.value)}
          />
          <InputMinha
            sx={{
              input: {
                color: 'white',
                "&::placeholder": {
                  opacity: 1,
                  color: 'white',
                },
              },
              label: { color: 'white' },
            }}
            label="Senha"
            type="password"
            value={senhaLogin}
            onChange={(e) => setSenhaLogin(e.target.value)}
          />
          <ButtonMeu onClick={() => handleSubmitLogin(emailLogin, senhaLogin, navigate, setResponseMessage, setLoading)}>
            {loading ? 'Carregando' : 'Confirmar'}
          </ButtonMeu>
        </Stack>
      </Stack>

      <Stack sx={{ gap: '0.5rem', alignItems: 'center' }}>
        <Divider sx={{ color: '#fff', background: '#fff', width: '100%' }} />
        <p style={{ fontSize: '16px' }}>
          {' '}
          <b onClick={() => console.log("Esqueci minha senha")} style={{ color: 'rgba(89,194,255,1)', cursor: 'pointer' }}>
            Esqueci minha senha
          </b>
        </p>
      </Stack>
    </LoginBack>
  );
};

export default ContainerBoard;
