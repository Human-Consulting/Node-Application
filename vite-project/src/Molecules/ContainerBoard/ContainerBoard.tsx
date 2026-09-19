import { useState } from "react";
import { Alert, Divider, Snackbar, Stack, InputAdornment, IconButton } from "@mui/material";
import { ButtonMeu, LoginBack, LoginTitulo, InputMinha } from "./ContainerBoard.styles";
import { useNavigate } from "react-router";
import { handleSubmitLogin } from "../../Utils/UsePost";
import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

interface ContainerBoardProps {
  toggleModal: () => void;
}

const ContainerBoard = ({ toggleModal }: ContainerBoardProps) => {
  const navigate = useNavigate();
  const { setUsuario } = useAuth();
  const [responseMessage, setResponseMessage] = React.useState('');
  const [responseSucess, setResponseSucess] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [emailLogin, setEmailLogin] = React.useState("");
  const [senhaLogin, setSenhaLogin] = React.useState("");
  const [showSenhaAtual, setShowSenhaAtual] = useState(false);

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
                color: 'text.primary',
                "&::placeholder": {
                  opacity: 1,
                  color: 'text.primary',
                },
              },
              label: { color: 'text.primary' },
            }}
            label="E-mail"
            value={emailLogin}
            onChange={(e) => setEmailLogin(e.target.value)}
          />
          <InputMinha
            sx={{
              input: {
                color: 'text.primary',
                "&::placeholder": {
                  opacity: 1,
                  color: 'text.primary',
                },
              },
              label: { color: 'text.primary' },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowSenhaAtual(!showSenhaAtual)}
                    edge="end"
                  >
                    {showSenhaAtual ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            label="Senha"
            type={showSenhaAtual ? "text" : "password"}
            value={senhaLogin}
            onChange={(e) => setSenhaLogin(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmitLogin(emailLogin, senhaLogin, navigate, setResponseMessage, setLoading, setUsuario)}
          />
          <ButtonMeu onClick={() => handleSubmitLogin(emailLogin, senhaLogin, navigate, setResponseMessage, setLoading, setUsuario)}>
            {loading ? 'Carregando' : 'Confirmar'}
          </ButtonMeu>
        </Stack>
      </Stack>

      <Stack sx={{ gap: '0.5rem', alignItems: 'center' }}>
        <Divider sx={{ color: 'text.primary', background: 'text.primary', width: '100%' }} />
        <p style={{ fontSize: '16px' }}>
          <b>
            <button
              type="button"
              onClick={() => toggleModal()}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                margin: 0,
                color: 'inherit',
                font: 'inherit',
                fontWeight: 'inherit',
                cursor: 'pointer',
              }}
            >
              Esqueci minha senha
            </button>
          </b>
        </p>
      </Stack>
    </LoginBack >
  );
};

export default ContainerBoard;
