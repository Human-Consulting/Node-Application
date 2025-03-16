import { Alert, Divider, Snackbar, Stack } from "@mui/material";
import { ButtonMeu, LoginBack, LoginTitulo, InputMinha } from "./ContainerBoard.styles";
import { useNavigate } from "react-router";
import { handleSubmitLogin } from "../../Utils/UsePost";
import { handleSubmitCadastro } from "../../Utils/UseCadastro"; 
import React from "react";

const ContainerBoard = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = React.useState(true);
  const [responseMessage, setResponseMessage] = React.useState(''); // Para exibir a mensagem de erro
  const [responseSucess, setResponseSucess] = React.useState(''); // Para exibir a mensagem de sucesso

  const [loading, setLoading] = React.useState(false);
  const [emailLogin, setEmailLogin] = React.useState("");
  const [senhaLogin, setSenhaLogin] = React.useState("");
  const [nomeCadastro, setNomeCadastro] = React.useState("");
  const [emailCadastro, setEmailCadastro] = React.useState("");
  const [senhaCadastro, setSenhaCadastro] = React.useState("");
  const [confirmarSenhaCadastro, setConfirmarSenhaCadastro] = React.useState("");

  return (
    <LoginBack>
      {/* Snackbar para Mensagem de Erro */}
      <Snackbar open={Boolean(responseMessage)}>
        <Alert
          severity="error"
          variant="filled"
          autoHideDuration={3000} // Mensagem desaparece após 3 segundos
          sx={{ width: '100%' }}
        >
          {responseMessage}
        </Alert>
      </Snackbar>

      {/* Snackbar para Mensagem de Sucesso */}
      <Snackbar open={Boolean(responseSucess)}>
        <Alert
          severity="success"
          variant="filled"
          autoHideDuration={3000} // Mensagem desaparece após 3 segundos
          sx={{ width: '100%' }}
        >
          {responseSucess}
        </Alert>
      </Snackbar>

      <Stack sx={{ gap: '0.5rem' }}>
        <LoginTitulo>
          Tenha um <b>planejamento</b> inteligente
        </LoginTitulo>
        <p>Seu projeto, nossa ajuda e seu resultado</p>
      </Stack>

      {loginType ? (
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
      ) : (
        <Stack sx={{ gap: '0.7rem' }}>
          <p>Cadastre-se e não perca tempo</p>
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
              label="Nome"
              value={nomeCadastro}
              onChange={(e) => setNomeCadastro(e.target.value)}
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
              label="E-mail"
              value={emailCadastro}
              onChange={(e) => setEmailCadastro(e.target.value)}
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
              value={senhaCadastro}
              onChange={(e) => setSenhaCadastro(e.target.value)}
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
              label="Confirmar senha"
              type="password"
              value={confirmarSenhaCadastro}
              onChange={(e) => setConfirmarSenhaCadastro(e.target.value)}
            />
            <ButtonMeu onClick={() => handleSubmitCadastro(nomeCadastro, emailCadastro, senhaCadastro, confirmarSenhaCadastro, setLoading, setResponseMessage, setResponseSucess)}>
              {loading ? 'Carregando' : 'Confirmar'}
            </ButtonMeu>
          </Stack>
        </Stack>
      )}

      <Stack sx={{ position: 'absolute', bottom: '3rem', gap: '0.5rem' }}>
        <Divider sx={{ color: '#fff', background: '#fff', width: '400px' }} />

        {loginType ? (
          <p style={{ fontSize: '16px' }}>
            Ainda não tenho uma conta e gostaria de se{' '}
            <b onClick={() => setLoginType(false)} style={{ color: 'rgba(89,194,255,1)', cursor: 'pointer' }}>
              Cadastrar
            </b>
          </p>
        ) : (
          <p style={{ fontSize: '16px' }}>
            Caso já tenha uma conta, clique{' '}
            <b onClick={() => setLoginType(true)} style={{ color: 'rgba(89,194,255,1)', cursor: 'pointer' }}>
              Aqui
            </b>
          </p>
        )}
      </Stack>
    </LoginBack>
  );
};

export default ContainerBoard;
