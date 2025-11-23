import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import Tabela from "../Tabela/Tabela";
import { UsuariosBody } from './Usuarios.styles'
import { Box, Typography, Button, TextField, Stack, Pagination } from '@mui/material';
import { ArrowCircleLeftOutlined, Close, Search, SearchOff } from '@mui/icons-material'
import { useNavigate, useParams } from "react-router";
import Shader from "../Shader/Shader";
import { Load } from "../../Utils/Load";
import { getUsuarios } from "../../Utils/cruds/CrudsUsuario";
import ModalUsuario from "../Mudal2/ModalUsuario";
import ModalEditarSenhaUsuario from "../Mudal2/ModalEditarSenhaUsuario";

const Usuarios = ({ toogleLateralBar, color1, color2, color3, animate, telaAtual }) => {

  const navigate = useNavigate();
  const { idEmpresa, nomeEmpresa } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [editarUsuario, setEditarUsuario] = useState(false);
  const [idUsuarioEditar, setIdUsuarioEditar] = useState(null);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const [buscaTitulo, setBuscaTitulo] = useState("");
  const [onSearch, setOnSearch] = useState(false);

  const [popoverUsuarioAnchor, setPopoverUsuarioAnchor] = useState(false);

  const clearSearch = async () => {
    await atualizarUsuarios(0, null);
    setOnSearch(false);
    setBuscaTitulo("");
  }

  const [page, setPage] = useState(0);

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  if (!usuarioLogado.permissao.includes("CONSULTOR") && nomeEmpresa == 'Empresas') navigate(-1);

  const handleOpenProject = async () => {
    navigate(`/Home/${nomeEmpresa}/${idEmpresa}`)
  }

  useEffect(() => {
    if (buscaTitulo.trim() !== "") {
      setOnSearch(true);
      const textoLower = buscaTitulo.toLowerCase();
      atualizarUsuarios(0, textoLower);
    } else {
      clearSearch();
    }
  }, [buscaTitulo]);

  const atualizarUsuarios = async (page = 0, nome = null) => {
    try {
      const usuariosRetornados = await getUsuarios(Number(idEmpresa), page, 6, nome, false);

      setUsuarios(usuariosRetornados?.content || []);
      setUsuariosFiltrados(usuariosRetornados?.content || []);
      setTotalPages(usuariosRetornados?.totalPages || 1);
    } catch (error) {
      console.error("Erro ao atualizar usuários:", error);
      return { content: [], totalPages: 1, pageSize: 10 };
    }
  };

  useEffect(() => {
    const atualizar = async () => {
      setLoading(true);
      toogleLateralBar();
      telaAtual();
      await atualizarUsuarios();
      setLoading(false);
    }
    atualizar();
  }, [page]);

  const toogleModal = (usuario) => {
    editarUsuario && setEditarUsuario(false);
    setUsuario(usuario);
    setShowModal(!showModal);
    setPopoverUsuarioAnchor(!popoverUsuarioAnchor);
  };

  const toogleEditarSenhaUsuario = (id) => {
    setEditarUsuario(!editarUsuario);
  }

  if (loading) return <Load animate={animate} color1={color1} color2={color2} color3={color3} index={0} />;

  return (
    <UsuariosBody style={{ position: 'relative', zIndex: 0 }}>

      <Shader animate={animate} color1={color1} color2={color2} color3={color3} index={-1} />
      <Typography variant="h3" mt={3} mb={2} sx={{ display: 'flex', alignItems: 'center', fontFamily: "Bebas Neue" }}><ArrowCircleLeftOutlined sx={{ cursor: 'pointer', fontSize: '45px', marginRight: 1 }} onClick={handleOpenProject} />{idEmpresa == 1 ? "Human Consulting" : nomeEmpresa} - Gerenciamento de Usuários</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, borderBottom: 'solid white 1px', gap: '1rem' }}>
        <TextField
          value={buscaTitulo}
          onChange={(e) => setBuscaTitulo(e.target.value)}
          label={<Stack sx={{ flexDirection: 'row', gap: 0.5 }}> <Search /> Buscar usuário...</Stack>}
          sx={{ flex: 1 }}
          size="large"
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
        {usuarioLogado.permissao == "FUNC" ? null : <Button onClick={() => toogleModal(null)} variant="contained" color="primary">Adicionar Usuário</Button>}
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
          {usuarioLogado.permissao == "FUNC" ? null : <Button onClick={() => toogleModal(null)} variant="contained" color="primary">Adicionar Usuário</Button>}
        </Stack>
      }
      {editarUsuario ?
        <ModalEditarSenhaUsuario
          open={Boolean(popoverUsuarioAnchor)}
          anchorEl={popoverUsuarioAnchor}
          onClose={toogleEditarSenhaUsuario}
          idUsuario={idUsuarioEditar}
          atualizarUsuarios={atualizarUsuarios}
          editarSenhaUsuario={toogleEditarSenhaUsuario}
        />
        :
        <ModalUsuario
          open={Boolean(popoverUsuarioAnchor)}
          anchorEl={popoverUsuarioAnchor}
          onClose={() => setPopoverUsuarioAnchor(null)}
          diretor={usuariosFiltrados.length > 0 && (usuariosFiltrados.some(usuario => usuario.permissao.includes('DIRETOR')))}
          usuario={usuario}
          toogleModal={toogleModal}
          atualizarUsuarios={atualizarUsuarios}
          fkEmpresa={idEmpresa}
          qtdUsuarios={usuarios.length}
          editarSenhaUsuario={toogleEditarSenhaUsuario}
        />
      }


    </UsuariosBody >
  )
}

export default Usuarios;
