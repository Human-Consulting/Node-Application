import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Modal from "../Modal/Modal";
import Tabela from "../Tabela/Tabela";
import { UsuariosBody } from './Usuarios.styles'
import { Box, Typography, Button, TextField, Stack } from '@mui/material';
import { ArrowCircleLeftOutlined, Close, Search, SearchOff } from '@mui/icons-material'
import { useNavigate, useParams } from "react-router";
import Shader from "../Shader/Shader";
import { Load } from "../../Utils/Load";
import { getUsuarios, Usuario, PagedResponse } from "../../Utils/cruds/CrudsUsuario";
import ModalUsuario from "../Mudal2/ModalUsuario";
import ModalEditarSenhaUsuario from "../Mudal2/ModalEditarSenhaUsuario";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

interface UsuarioLogadoExtras {
  permissao?: string;
}

interface UsuariosProps {
  toogleLateralBar: () => void;
  telaAtual: () => void;
}

const Usuarios = ({ toogleLateralBar, telaAtual }: UsuariosProps) => {

  const navigate = useNavigate();
  const { idEmpresa, nomeEmpresa } = useParams();
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [editarUsuario, setEditarUsuario] = useState(false);
  const [idUsuarioEditar, setIdUsuarioEditar] = useState<number | string | null>(null);

  const [buscaTitulo, setBuscaTitulo] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [nomeFiltro, setNomeFiltro] = useState<string | null>(null);

  const [popoverUsuarioAnchor, setPopoverUsuarioAnchor] = useState<boolean | null>(false);

  const [page, setPage] = useState(0);

  const { usuario: usuarioLogadoRaw } = useAuth();
  const usuarioLogado = usuarioLogadoRaw as (typeof usuarioLogadoRaw & UsuarioLogadoExtras);
  const { color1, color2, color3, animate } = useTheme();

  if (!usuarioLogado?.permissao?.includes("CONSULTOR") && nomeEmpresa == 'Empresas') navigate(-1);

  const handleOpenProject = async () => {
    navigate(`/Home/${nomeEmpresa}/${idEmpresa}`)
  }

  const usuariosQuery = useQuery<PagedResponse<Usuario> | null>({
    queryKey: ['usuarios', idEmpresa, page, nomeFiltro],
    queryFn: () => getUsuarios(Number(idEmpresa), page, 6, nomeFiltro, false),
    enabled: !!idEmpresa,
  });

  const usuariosFiltrados = usuariosQuery.data?.content || [];
  const usuarios = usuariosFiltrados;
  const totalPages = usuariosQuery.data?.totalPages || 1;
  const loading = usuariosQuery.isPending;

  const clearSearch = () => {
    setBuscaTitulo("");
    setOnSearch(false);
    setNomeFiltro(null);
    setPage(0);
  }

  useEffect(() => {
    if (buscaTitulo.trim() !== "") {
      setOnSearch(true);
      setPage(0);
      setNomeFiltro(buscaTitulo.toLowerCase());
    } else {
      setOnSearch(false);
      setNomeFiltro(null);
    }
  }, [buscaTitulo]);

  const atualizarUsuarios = async (page = 0, nome: string | null = null) => {
    setPage(page);
    setNomeFiltro(nome);
    try {
      return await queryClient.fetchQuery({
        queryKey: ['usuarios', idEmpresa, page, nome],
        queryFn: () => getUsuarios(Number(idEmpresa), page, 6, nome, false),
      });
    } catch (error) {
      console.error("Erro ao atualizar usuários:", error);
      return { content: [], totalPages: 1, pageSize: 10 };
    }
  };

  useEffect(() => {
    toogleLateralBar();
    telaAtual();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toogleModal = (usuario: Usuario | null) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    editarUsuario && setEditarUsuario(false);
    setUsuario(usuario);
    setShowModal(!showModal);
    setPopoverUsuarioAnchor(!popoverUsuarioAnchor);
  };

  const toogleEditarSenhaUsuario = (id?: number | string | null) => {
    setEditarUsuario(!editarUsuario);
  }

  if (loading) return <Load />;

  return (
    <UsuariosBody style={{ position: 'relative', zIndex: 0 }}>

      <Shader animate={animate} color1={color1} color2={color2} color3={color3} index={-1} />
      <Typography variant="h3" mt={3} mb={2} sx={{ display: 'flex', alignItems: 'center', fontFamily: "Bebas Neue" }}><ArrowCircleLeftOutlined sx={{ cursor: 'pointer', fontSize: '45px', marginRight: 1 }} onClick={handleOpenProject} />{idEmpresa == '1' ? "Human Consulting" : nomeEmpresa} - Gerenciamento de Usuários</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, borderBottom: 'solid white 1px', gap: '1rem' }}>
        <TextField
          value={buscaTitulo}
          onChange={(e) => setBuscaTitulo(e.target.value)}
          label={<Stack sx={{ flexDirection: 'row', gap: 0.5 }}> <Search /> Buscar usuário...</Stack>}
          sx={{ flex: 1 }}
          size={"large" as never}
          autoComplete="off"
          InputLabelProps={{
            sx: {
              color: "white",
              '&.Mui-focused': {
                color: 'white',
              }
            }
          }}
          InputProps={{
            sx: {
              color: "white",
              '& .MuiOutlinedInput-notchedOutline': {
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#fff'
              }
            }
          }}
        />
        <Close
          onClick={clearSearch}
          sx={{
            color: '#FFF',
            cursor: 'pointer',
            transition: '0.3s',
            border: '1px solid transparent',
            borderRadius: '4px',
            display: `${onSearch ? 'unset' : 'none'}`,
            '&:hover': {
              border: '1px solid #f0f0f0'
            }
          }}
        />
        {usuarioLogado?.permissao == "FUNC" ? null : <Button onClick={() => toogleModal(null)} variant="contained" color="primary">Adicionar Usuário</Button>}
      </Box>
      {usuariosFiltrados.length > 0 ?
        <>
          <Tabela usuarios={usuariosFiltrados} toogleModal={toogleModal} atualizarUsuarios={atualizarUsuarios} totalPages={totalPages} page={page} setPage={setPage} />
        </>
        :
        <Stack sx={{ alignItems: 'center', justifyContent: 'center', height: '50%', gap: 2 }}>
          <Stack sx={{ alignItems: 'center' }}>
            <SearchOff sx={{ fontSize: '5rem' }} />
            Nenhum usuário encontrado!
          </Stack>
          {usuarioLogado?.permissao == "FUNC" ? null : <Button onClick={() => toogleModal(null)} variant="contained" color="primary">Adicionar Usuário</Button>}
        </Stack>
      }
      {editarUsuario ?
        <ModalEditarSenhaUsuario
          open={Boolean(popoverUsuarioAnchor)}
          onClose={toogleEditarSenhaUsuario}
          idUsuario={idUsuarioEditar}
          atualizarUsuarios={atualizarUsuarios}
          editarSenhaUsuario={toogleEditarSenhaUsuario}
        />
        :
        <ModalUsuario
          open={Boolean(popoverUsuarioAnchor)}
          onClose={() => setPopoverUsuarioAnchor(null)}
          diretor={usuariosFiltrados.length > 0 && (usuariosFiltrados.some(usuario => usuario.permissao?.includes('DIRETOR')))}
          usuario={usuario}
          toogleModal={toogleModal}
          atualizarUsuarios={atualizarUsuarios}
          editarSenhaUsuario={toogleEditarSenhaUsuario}
        />
      }


    </UsuariosBody >
  )
}

export default Usuarios;
