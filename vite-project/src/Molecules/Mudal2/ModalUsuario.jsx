import {
  Box,
  Button,
  Dialog,
  Grow,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme
} from "@mui/material";

import { postUsuario, putUsuario } from '../../Utils/cruds/CrudsUsuario.jsx';
import { Close, Send } from "@mui/icons-material";
import { useWarningValidator } from "../../Utils/useWarning.jsx";
import { useEffect, useState } from "react";
import { Content, Actions } from "./Modal.style.jsx";
import { useParams } from "react-router";

const ModalUsuario = ({
  open,
  onClose,
  diretor,
  usuario,
  toogleModal,
  atualizarUsuarios,
  editarSenhaUsuario
}) => {
  const theme = useTheme(); // ✅ TEMA GLOBAL
  const { idEmpresa, nomeEmpresa } = useParams();

  const [nome, setNome] = useState(usuario?.nome || '');
  const [email, setEmail] = useState(usuario?.email || '');
  const [cargo, setCargo] = useState(usuario?.cargo || '');
  const [area, setArea] = useState(usuario?.area || '');
  const [permissao, setPermissao] = useState(usuario?.permissao || "#");

  const [erros, setErros] = useState({});

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  useEffect(() => {
    setNome(usuario?.nome || '');
    setEmail(usuario?.email || '');
    setCargo(usuario?.cargo || '');
    setArea(usuario?.area || '');
    setPermissao(usuario?.permissao || "#");
  }, [usuario]);

  const handlePostUsuario = async () => {
    if (!validarCampos()) return;

    const newUsuario = {
      nome,
      email,
      cargo,
      area: area.toUpperCase(),
      permissao,
      fkEmpresa: idEmpresa,
      idEditor: usuarioLogado.idUsuario,
      permissaoEditor: usuarioLogado.permissao
    };

    const response = await postUsuario(newUsuario);
    if (response) {
      atualizarUsuarios();
      toogleModal();
    }
  };

  const handlePutUsuario = async () => {
    if (!validarCampos()) return;

    const modifiedUsuario = {
      idEditor: usuarioLogado.idUsuario,
      permissaoEditor: usuarioLogado.permissao,
      idUsuario: usuario.idUsuario,
      nome,
      email,
      cargo,
      area: area.toUpperCase(),
      permissao
    };

    const response = await putUsuario(modifiedUsuario, usuario.idUsuario);
    if (response) {
      atualizarUsuarios();
      toogleModal();
    }
  };

  const mostrarPermissaoSelect =
    (usuario == null && usuarioLogado.permissao !== 'FUNC') ||
    (usuario != null && (() => {
      const perm = usuarioLogado.permissao;
      const target = usuario.permissao;

      if (usuarioLogado.idUsuario != usuario.idUsuario) return true;
      if (perm.includes('DIRETOR')) return !target.includes('DIRETOR');
      if (perm.includes('CONSULTOR_DIRETOR')) return ['GESTOR', 'CONSULTOR', 'FUNC'].includes(target);
      if (perm.includes('CONSULTOR')) return true;
      if (perm === 'GESTOR') return ['GESTOR', 'FUNC'].includes(target);

      return false;
    })());

  const handleEditarSenhaUsuario = () => {
    editarSenhaUsuario(usuario.idUsuario);
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validarCampos = () => {
    const novosErros = {};

    if (!nome.trim()) novosErros.nome = "Nome é obrigatório";
    if (!email.trim()) novosErros.email = "Email é obrigatório";
    else if (!emailRegex.test(email)) novosErros.email = "Formato de email inválido";
    if (!cargo.trim()) novosErros.cargo = "Cargo é obrigatório";
    if (!area.trim()) novosErros.area = "Área é obrigatória";
    if (mostrarPermissaoSelect && permissao === "#") novosErros.permissao = "Permissão é obrigatória";

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const removerErro = (campo) => {
    setErros((prev) => {
      const { [campo]: _, ...resto } = prev;
      return resto;
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">

      <Content sx={{ background: theme.palette.background.paper }}>

        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <Close onClick={onClose} sx={{ cursor: "pointer" }} />
        </Box>

        <Stack gap={3}>

          <Typography textAlign="center" fontWeight="bold" fontSize={18}>
            {usuario == null ? "Criar Usuário" : "Editar Usuário"}
          </Typography>

          <TextField
            label="Nome"
            value={nome}
            onChange={(e) => {
              removerErro("nome");
              setNome(e.target.value);
            }}
            fullWidth
            autoComplete="off"
            error={!!erros.nome}
            helperText={erros.nome}
          />

          <TextField
            label="Email"
            value={email}
            onChange={(e) => {
              removerErro("email");
              setEmail(e.target.value);
            }}
            fullWidth
            autoComplete="off"
            error={!!erros.email}
            helperText={erros.email}
          />

          {usuarioLogado.permissao !== 'FUNC' && (
            <>
              <TextField
                label="Cargo"
                value={cargo}
                onChange={(e) => {
                  removerErro("cargo");
                  setCargo(e.target.value);
                }}
                fullWidth
                autoComplete="off"
                error={!!erros.cargo}
                helperText={erros.cargo}
              />

              <TextField
                label="Área"
                value={area}
                onChange={(e) => {
                  removerErro("area");
                  setArea(e.target.value);
                }}
                fullWidth
                autoComplete="off"
                error={!!erros.area}
                helperText={erros.area}
              />

              {mostrarPermissaoSelect && (
                <Select
                  value={permissao}
                  onChange={(e) => {
                    removerErro("permissao");
                    setPermissao(e.target.value);
                  }}
                  fullWidth
                  displayEmpty
                  error={!!erros.permissao}
                  MenuProps={{
                    TransitionComponent: Grow,
                    PaperProps: {
                      sx: {
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                        borderRadius: 2,
                        mt: 1,
                        maxHeight: 200,
                      }
                    }
                  }}
                >
                  <MenuItem value="#">Selecione a permissão</MenuItem>

                  {(() => {
                    const isEmpresas = nomeEmpresa === 'Empresas';
                    const isConsultor = usuarioLogado.permissao.includes('CONSULTOR');

                    if (isEmpresas) {
                      if (!diretor || (diretor && usuario?.permissao.includes("DIRETOR"))) {
                        return <MenuItem value="CONSULTOR_DIRETOR">Consultor Diretor</MenuItem>;
                      } else {
                        return ([
                          isConsultor && <MenuItem key="CONSULTOR" value="CONSULTOR">Consultor</MenuItem>,
                          <MenuItem key="GESTOR" value="GESTOR">Gestor</MenuItem>,
                          <MenuItem key="FUNC" value="FUNC">Team Member</MenuItem>
                        ]);
                      }
                    } else {
                      if (!diretor || (diretor && usuario?.permissao.includes("DIRETOR"))) {
                        return <MenuItem value="DIRETOR">Diretor</MenuItem>;
                      } else {
                        return ([
                          isConsultor && <MenuItem key="CONSULTOR" value="CONSULTOR">Consultor</MenuItem>,
                          <MenuItem key="GESTOR" value="GESTOR">Gestor</MenuItem>,
                          <MenuItem key="FUNC" value="FUNC">Team Member</MenuItem>
                        ]);
                      }
                    }
                  })()}
                </Select>
              )}
            </>
          )}
        </Stack>
      </Content>

      <Actions>
        {usuario == null ? (
          <Button
            variant="contained"
            onClick={handlePostUsuario}
            endIcon={<Send />}
            sx={{ flex: 1 }}
          >
            Adicionar
          </Button>
        ) : (
          <>
            {usuario.idUsuario === usuarioLogado.idUsuario && (
              <Button
                variant="outlined"
                color="error"
                onClick={handleEditarSenhaUsuario}
                sx={{ flex: 1 }}
              >
                EDITAR SENHA
              </Button>
            )}

            <Button
              variant="contained"
              onClick={handlePutUsuario}
              endIcon={<Send />}
              sx={{ flex: 1 }}
            >
              SALVAR
            </Button>
          </>
        )}
      </Actions>

    </Dialog>
  );
};

export default ModalUsuario;
