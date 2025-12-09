import {
  Chip,
  Stack,
  Tooltip,
  Typography,
  Pagination,
  IconButton,
  Box,
  Popover,
  TextField,
  useTheme,
} from "@mui/material";

import {
  CardZone,
  ChipZone,
  DivisorOne,
  DivisorTwo,
  Header,
  Item,
  LateralNavBar,
  Title,
} from "./LateralBar.styles";

import {
  Home,
  Insights,
  Chat,
  Group,
  Widgets,
  ChevronRight,
  ChevronLeft,
  Logout,
  Search,
} from "@mui/icons-material";

import ProjectsTypes from "../../Atoms/ProjectsTypes";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

const LateralBar = ({
  menuRapido,
  kpis,
  atualizarLaterais,
  diminuirLateralBar,
  toogleLateralBar,
  telaAtual,
}) => {
  const theme = useTheme();

  const [menuLista, setMenuLista] = useState(menuRapido?.content || []);
  const [filtroConcluido, setFiltroConcluido] = useState(false);
  const [filtroImpedimento, setFiltroImpedimento] = useState(false);
  const [menuRapidoAberto, setMenuRapidoAberto] = useState(true);
  const [totalPages, setTotalPages] = useState(menuRapido?.totalPages || 0);
  const [page, setPage] = useState(0);

  const caosList = kpis?.impedidos?.length || 0;

  const { nomeEmpresa, idEmpresa } = useParams();
  const navigate = useNavigate();
  const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
  const [buscaTitulo, setBuscaTitulo] = useState("");

  const handleOpenHome = () => {
    if (usuarioLogado.permissao.includes("CONSULTOR"))
      navigate(`/Home/Empresas/1`);
    else navigate(`/Home/${nomeEmpresa}/${idEmpresa}`);
  };

  const handleOpenUsuarios = () =>
    navigate(`/Home/${nomeEmpresa}/${idEmpresa}/Usuarios`);
  const handleOpenDash = () =>
    navigate(`/Home/${nomeEmpresa}/${idEmpresa}/Dash`);
  const handleOpenChat = () =>
    navigate(`/Home/${nomeEmpresa}/${idEmpresa}/Chat`);

  const handleExit = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleClick = (acao) => {
    if (acao === "concluido") {
      setFiltroConcluido((prev) => !prev);
      setFiltroImpedimento(false);
    } else if (acao === "impedido") {
      setFiltroImpedimento((prev) => !prev);
      setFiltroConcluido(false);
    }
  };

  useEffect(() => {
    let nome = null;
    if (buscaTitulo.length > 0) nome = buscaTitulo.toLowerCase();

    if (filtroConcluido)
      atualizarLaterais({ idEmpresa, concluidos: true, nome });
    else if (filtroImpedimento)
      atualizarLaterais({ idEmpresa, impedidos: true, nome });
    else atualizarLaterais({ idEmpresa, page: 0, nome });
  }, [filtroConcluido, filtroImpedimento, buscaTitulo]);

  useEffect(() => {
    setMenuLista(menuRapido?.content || []);
    setTotalPages(menuRapido?.totalPages || 0);
  }, [menuRapido]);

  useEffect(() => {
    atualizarLaterais({ idEmpresa, page });
  }, [page, nomeEmpresa]);

  const [anchorSearch, setAnchorSearch] = useState(null);
  const handleOpenSearch = (event) => setAnchorSearch(event.currentTarget);
  const handleCloseSearch = () => {
    setAnchorSearch(null);
    setBuscaTitulo("");
  };

  return (
    <LateralNavBar diminuido={diminuirLateralBar}>
      <Header>
        <Tooltip title="Sair">
          <Box
            onClick={handleExit}
            sx={{ cursor: "pointer", color: theme.palette.iconPrimary }}
          >
            <Logout />
          </Box>
        </Tooltip>

        {!diminuirLateralBar && (
          <Typography
            variant="h6"
            sx={{ fontFamily: "Bebas Neue", color: theme.palette.iconPrimary }}
          >
            Human Consulting
          </Typography>
        )}

        <Box
          onClick={toogleLateralBar}
          sx={{ cursor: "pointer", color: theme.palette.iconPrimary }}
        >
          {diminuirLateralBar ? <ChevronRight /> : <ChevronLeft />}
        </Box>
      </Header>

      <DivisorOne>
        <Item
          telaAtual={telaAtual}
          item="Home"
          diminuido={diminuirLateralBar}
          onClick={handleOpenHome}
          sx={{ color: theme.palette.iconPrimary }}
        >
          <Home />
          {!diminuirLateralBar && <Title>Home</Title>}
        </Item>

        {/*
        <Item
          telaAtual={telaAtual}
          item="Chat"
          diminuido={diminuirLateralBar}
          onClick={handleOpenChat}
          sx={{ color: theme.palette.iconPrimary }}
        >
          <Chat />
          {!diminuirLateralBar && <Title>Chat</Title>}
        </Item>
        */}

        <Item
          telaAtual={telaAtual}
          item="Dash"
          diminuido={diminuirLateralBar}
          onClick={handleOpenDash}
          sx={{ color: theme.palette.iconPrimary }}
        >
          <Insights />
          {!diminuirLateralBar && <Title>Dashboard Geral</Title>}
        </Item>

        <Item
          telaAtual={telaAtual}
          item="Usuarios"
          diminuido={diminuirLateralBar}
          onClick={handleOpenUsuarios}
          sx={{ color: theme.palette.iconPrimary }}
        >
          <Group />
          {!diminuirLateralBar && <Title>Gerenciamento de Usuários</Title>}
        </Item>
      </DivisorOne>

      <DivisorTwo>
        <Item
          diminuido={diminuirLateralBar}
          sx={{ color: theme.palette.iconPrimary }}
        >
          <Widgets />
          {!diminuirLateralBar && (
            <Title style={{ flex: 1 }}>Menu Rápido</Title>
          )}
        </Item>

        {menuRapidoAberto && (
          <>
            {!diminuirLateralBar && (
              <ChipZone>
                <Chip
                  sx={{
                    backgroundColor: filtroConcluido
                      ? theme.palette.primary.main
                      : theme.palette.background.paper,
                  }}
                  label="Concluídos"
                  onClick={() => handleClick("concluido")}
                />

                <Chip
                  sx={{
                    backgroundColor: filtroImpedimento
                      ? theme.palette.error.main
                      : theme.palette.background.paper,
                  }}
                  label={`Impedidos ${caosList > 0 ? `(${caosList})` : ""}`}
                  onClick={() => handleClick("impedido")}
                />

                <Chip
                  sx={{ backgroundColor: theme.palette.background.paper }}
                  label={<Search />}
                  onClick={handleOpenSearch}
                />
              </ChipZone>
            )}

            <CardZone>
              {menuLista.map((entidade) => (
                <ProjectsTypes
                  key={entidade.idProjeto || entidade.idEmpresa}
                  entidade={entidade}
                  diminuirLateralBar={diminuirLateralBar}
                  telaAtual={telaAtual}
                />
              ))}
            </CardZone>

            <Stack direction="row" justifyContent="center" alignItems="center">
              {diminuirLateralBar ? (
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconButton
                    size="small"
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    disabled={page === 0}
                    sx={{ color: theme.palette.iconPrimary }}
                  >
                    <ChevronLeft />
                  </IconButton>

                  <Box
                    sx={{
                      fontSize: "0.75rem",
                      color: theme.palette.iconPrimary,
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: "50%",
                      width: "22px",
                      height: "22px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {page + 1}
                  </Box>

                  <IconButton
                    size="small"
                    onClick={() =>
                      setPage((prev) => Math.min(prev + 1, totalPages - 1))
                    }
                    disabled={page + 1 >= totalPages}
                    sx={{ color: theme.palette.iconPrimary }}
                  >
                    <ChevronRight />
                  </IconButton>
                </Stack>
              ) : (
                <Pagination
                  count={totalPages}
                  page={page + 1}
                  onChange={(e, value) => setPage(value - 1)}
                  color="primary"
                  size="small"
                />
              )}
            </Stack>
          </>
        )}
      </DivisorTwo>

      <Popover
        open={Boolean(anchorSearch)}
        anchorEl={anchorSearch}
        onClose={handleCloseSearch}
        anchorOrigin={{ vertical: "center", horizontal: "left" }}
        transformOrigin={{ vertical: "center", horizontal: "right" }}
      >
        <Box
          sx={{
            bgcolor: theme.palette.background.default,
            color: theme.palette.iconPrimary,
            p: 1,
            borderRadius: 2,
          }}
        >
          <TextField
            autoFocus
            placeholder={`Buscar ${
              nomeEmpresa === "Empresas" ? "empresa" : "projeto"
            }...`}
            variant="outlined"
            size="small"
            value={buscaTitulo}
            onChange={(e) => setBuscaTitulo(e.target.value)}
          />
        </Box>
      </Popover>
    </LateralNavBar>
  );
};

export default LateralBar;
