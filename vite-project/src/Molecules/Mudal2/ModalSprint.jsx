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

  // ⭐ TEMA DINÂMICO DO CONTEXTO
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

  const removerErro = (campo) => {
    setErros((prev) => {
      const { [campo]: _, ...resto } = prev;
      return resto;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs" sx={{ zIndex: 150 }}>
        <Content>
          <Box
            display="flex"
            justifyContent={useWarningValidator(sprint) ? "space-between" : "flex-end"}
            alignItems="center"
          >
            {useWarningValidator(sprint)}
            <Close onClick={onClose} sx={{ cursor: "pointer", color: "text.primary" }} />
          </Box>

          <Stack gap={3}>
            <Typography
              textAlign="center"
              fontWeight="bold"
              fontSize={18}
              color="text.primary"
            >
              {sprint == null ? "Criar Sprint" : "Editar Sprint"}
            </Typography>

            <TextField
              label="Título"
              value={titulo}
              onChange={(e) => {
                removerErro("titulo");
                setTitulo(e.target.value);
              }}
              disabled={usuarioLogado.permissao === "FUNC"}
              fullWidth
              sx={inputStyle.sx}
              error={!!erros.titulo}
              helperText={erros.titulo}
            />

            <TextField
              label="Descrição"
              multiline
              rows={3}
              value={descricao}
              onChange={(e) => {
                removerErro("descricao");
                setDescricao(e.target.value);
              }}
              disabled={usuarioLogado.permissao === "FUNC"}
              fullWidth
              sx={inputStyle.sx}
              error={!!erros.descricao}
              helperText={erros.descricao}
            />

            <Stack direction="row" gap={1}>
              <TextField
                label="Data de Início"
                type="date"
                value={dtInicio}
                onChange={(e) => {
                  removerErro("dtInicio");
                  setDtInicio(e.target.value);
                }}
                disabled={usuarioLogado.permissao === "FUNC"}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={inputStyle.sx}
                error={!!erros.dtInicio}
                helperText={erros.dtInicio}
              />

              <TextField
                label="Data Final"
                type="date"
                value={dtFim}
                onChange={(e) => {
                  removerErro("dtFim");
                  setDtFim(e.target.value);
                }}
                disabled={usuarioLogado.permissao === "FUNC"}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={inputStyle.sx}
                error={!!erros.dtFim}
                helperText={erros.dtFim}
              />
            </Stack>
          </Stack>
        </Content>

        <Actions>
          {sprint == null ? (
            <Button variant="contained" onClick={handlePostSprint}>
              Adicionar
            </Button>
          ) : usuarioLogado.permissao === "FUNC" ? null : (
            <>
              <Button variant="contained" color="error" onClick={handleDeleteSprint}>
                <Delete />
              </Button>

              <Button
                variant="contained"
                onClick={handlePutSprint}
                endIcon={<Send />}
                sx={{ flex: 1 }}
              >
                Salvar Alterações
              </Button>
            </>
          )}
        </Actions>
      </Dialog>
    </ThemeProvider>
  );
};

export default ModalSprint;
