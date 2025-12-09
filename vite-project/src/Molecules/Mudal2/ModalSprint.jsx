import { 
  Box, 
  Button, 
  Dialog, 
  Stack, 
  TextField, 
  Typography 
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { postSprint, putSprint, deleteSprint } from '../../Utils/cruds/CrudsSprint.jsx';
import { Close, Delete, Send } from "@mui/icons-material";
import { useWarningValidator } from "../../Utils/useWarning.jsx";
import { inputStyle } from "../Modal/Forms/Forms.styles.jsx";
import { useContext, useEffect, useState } from "react";
import { Content, Actions } from "./Modal.style.jsx";
import dayjs from "dayjs";
import { ThemeContext } from "../../Utils/themeContext.jsx";
import { getTheme } from "../../Utils/Theme.jsx";

const ModalSprint = ({ 
  open, 
  onClose, 
  sprint, 
  toogleModal, 
  fkProjeto, 
  atualizarSprints, 
  atualizarProjetos, 
  dtLastSprint 
}) => {

  const { mode } = useContext(ThemeContext);
  const theme = getTheme(mode);

  const diaSeguinte = dayjs(dtLastSprint).add(1, "day").format("YYYY-MM-DD");

  const [titulo, setTitulo] = useState(sprint?.titulo || "");
  const [descricao, setDescricao] = useState(sprint?.descricao || "");
  const [dtInicio, setDtInicio] = useState(sprint?.dtInicio || diaSeguinte);
  const [dtFim, setDtFim] = useState(sprint?.dtFim || "");

  useEffect(() => {
    setTitulo(sprint?.titulo || "");
    setDescricao(sprint?.descricao || "");
    setDtInicio(sprint?.dtInicio || diaSeguinte);
    setDtFim(sprint?.dtFim || "");
  }, [sprint]);

  const [erros, setErros] = useState({});
  const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));

  const validarCampos = () => {
    const novosErros = {};
    if (!titulo.trim()) novosErros.titulo = "Título é obrigatório";
    if (!descricao.trim()) novosErros.descricao = "Descrição é obrigatória";
    if (!dtInicio.trim()) novosErros.dtInicio = "Data inicial obrigatória";
    if (!dtFim.trim()) novosErros.dtFim = "Data final obrigatória";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const removerErro = (campo) => {
    setErros((prev) => {
      const { [campo]: _, ...resto } = prev;
      return resto;
    });
  };

  const handlePostSprint = async () => {
    if (!validarCampos()) return;
    setErros({});

    const newSprint = { 
      titulo, 
      descricao, 
      dtInicio, 
      dtFim, 
      fkProjeto, 
      idEditor: usuarioLogado.idUsuario, 
      permissaoEditor: usuarioLogado.permissao 
    };

    const response = await postSprint(newSprint);
    if (response) {
      atualizarSprints();
      atualizarProjetos();
      toogleModal();
    }
  };

  const handleDeleteSprint = async () => {
    const bodyDelete = { 
      idEditor: usuarioLogado.idUsuario, 
      permissaoEditor: usuarioLogado.permissao 
    };

    const response = await deleteSprint(sprint.idSprint, bodyDelete);
    toogleModal();

    if (response) {
      await atualizarSprints();
      await atualizarProjetos();
    }
  };

  const handlePutSprint = async () => {
    if (!validarCampos()) return;
    setErros({});

    const modifiedSprint = {
      idEditor: usuarioLogado.idUsuario,
      permissaoEditor: usuarioLogado.permissao,
      titulo,
      descricao,
      dtInicio,
      dtFim,
    };

    const response = await putSprint(modifiedSprint, sprint.idSprint);
    if (response) {
      atualizarSprints();
      atualizarProjetos();
      toogleModal();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog 
        open={open} 
        onClose={onClose} 
        fullWidth 
        maxWidth="xs"
        sx={{
          zIndex: 150,
          "& .MuiPaper-root": {
            background: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            color: theme.palette.text.primary
          }
        }}
      >
        <Content sx={{ background: theme.palette.background.paper }}>

          <Box
            display="flex"
            justifyContent={useWarningValidator(sprint) ? "space-between" : "flex-end"}
            alignItems="center"
          >
            {useWarningValidator(sprint)}
            <Close 
              onClick={onClose} 
              sx={{ 
                cursor: "pointer",
                color: theme.palette.text.primary 
              }} 
            />
          </Box>

          <Stack gap={3}>
            <Typography
              textAlign="center"
              fontWeight="bold"
              fontSize={18}
            >
              {sprint == null ? "Criar Sprint" : "Editar Sprint"}
            </Typography>

            {/* TÍTULO */}
            <TextField
              label={<Typography color={theme.palette.text.secondary}>Título</Typography>}
              value={titulo}
              onChange={(e) => {
                removerErro("titulo");
                setTitulo(e.target.value);
              }}
              disabled={usuarioLogado.permissao === "FUNC"}
              fullWidth
              sx={{ ...inputStyle.sx }}
              InputProps={{
                sx: {
                  color: theme.palette.text.primary
                }
              }}
              error={!!erros.titulo}
              helperText={
                erros.titulo ? (
                  <Typography color={theme.palette.error.main}>{erros.titulo}</Typography>
                ) : ""
              }
            />

            {/* DESCRIÇÃO */}
            <TextField
              label={<Typography color={theme.palette.text.secondary}>Descrição</Typography>}
              multiline
              rows={3}
              value={descricao}
              onChange={(e) => {
                removerErro("descricao");
                setDescricao(e.target.value);
              }}
              disabled={usuarioLogado.permissao === "FUNC"}
              fullWidth
              sx={{ ...inputStyle.sx }}
              InputProps={{
                sx: {
                  color: theme.palette.text.primary
                }
              }}
              error={!!erros.descricao}
              helperText={
                erros.descricao ? (
                  <Typography color={theme.palette.error.main}>{erros.descricao}</Typography>
                ) : ""
              }
            />

            {/* DATAS */}
            <Stack direction="row" gap={1}>
              <TextField
                label={<Typography color={theme.palette.text.secondary}>Data de Início</Typography>}
                type="date"
                value={dtInicio}
                onChange={(e) => {
                  removerErro("dtInicio");
                  setDtInicio(e.target.value);
                }}
                disabled={usuarioLogado.permissao === "FUNC"}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{ ...inputStyle.sx }}
                InputProps={{
                  sx: {
                    color: theme.palette.text.primary
                  }
                }}
                error={!!erros.dtInicio}
                helperText={
                  erros.dtInicio ? (
                    <Typography color={theme.palette.error.main}>{erros.dtInicio}</Typography>
                  ) : ""
                }
              />

              <TextField
                label={<Typography color={theme.palette.text.secondary}>Data Final</Typography>}
                type="date"
                value={dtFim}
                onChange={(e) => {
                  removerErro("dtFim");
                  setDtFim(e.target.value);
                }}
                disabled={usuarioLogado.permissao === "FUNC"}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{ ...inputStyle.sx }}
                InputProps={{
                  sx: {
                    color: theme.palette.text.primary
                  }
                }}
                error={!!erros.dtFim}
                helperText={
                  erros.dtFim ? (
                    <Typography color={theme.palette.error.main}>{erros.dtFim}</Typography>
                  ) : ""
                }
              />
            </Stack>
          </Stack>
        </Content>

        <Actions sx={{ background: theme.palette.background.paper }}>
          {sprint == null ? (
            <Button variant="contained" onClick={handlePostSprint}>
              <Typography>Adicionar</Typography>
            </Button>
          ) : usuarioLogado.permissao === "FUNC" ? null : (
            <>
              <Button variant="contained" color="error" onClick={handleDeleteSprint}>
                <Delete />
                <Typography ml={1}>Excluir</Typography>
              </Button>

              <Button
                variant="contained"
                onClick={handlePutSprint}
                endIcon={<Send />}
                sx={{ flex: 1 }}
              >
                <Typography>Salvar Alterações</Typography>
              </Button>
            </>
          )}
        </Actions>
      </Dialog>
    </ThemeProvider>
  );
};

export default ModalSprint;
