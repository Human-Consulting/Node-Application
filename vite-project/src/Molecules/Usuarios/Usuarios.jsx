import { useEffect, useState } from "react";
import FormsUsuario from "../Modal/Forms/FormsUsuario";
import Modal from "../Modal/Modal";
import Tabela from "../Tabela/Tabela";
import { UsuariosBody } from './Usuarios.styles'
import { Box, Typography, Button, TextField, Stack, Pagination } from '@mui/material';
import { ArrowCircleLeftOutlined, Search, SearchOff } from '@mui/icons-material'
import { useNavigate, useParams } from "react-router";
import FormsEditarSenhaUsuario from "../Modal/Forms/FormsEditarSenhaUsuario";
import Shader from "../Shader/Shader";
import { Load } from "../../Utils/Load";

const Usuarios = ({ toogleLateralBar, usuarios, sizeUsuarios, pagesUsuarios, atualizarUsuarios, color1, color2, color3, animate, telaAtual }) => {

  const navigate = useNavigate();
  const { idEmpresa, nomeEmpresa } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [editarUsuario, setEditarUsuario] = useState(false);
  const [idUsuarioEditar, setIdUsuarioEditar] = useState(null);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(pagesUsuarios || 0);
  const [pageSize, setPageSize] = useState(sizeUsuarios || 10);

  const [page, setPage] = useState(0);

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  if (!usuarioLogado.permissao.includes("CONSULTOR") && nomeEmpresa == 'Empresas') navigate(-1);

  const handleOpenProject = async () => {
    navigate(`/Home/${nomeEmpresa}/${idEmpresa}`)
  }

  const filtrarUsuarios = async (texto) => {
    if (texto !== '') {
      const textoLower = texto.toLowerCase();
      const usuariosFiltrados = await atualizarUsuarios(0, size, textoLower);
      setUsuariosFiltrados(usuariosFiltrados?.content || []);
      setTotalPages(usuariosFiltrados?.totalPages || 0);
    } else {
      setUsuariosFiltrados(usuarios);
      setTotalPages(pagesUsuarios);
    }
  };

  useEffect(() => {
    setLoading(true);
    toogleLateralBar();
    telaAtual();
    setUsuariosFiltrados(usuarios);
    setLoading(false);
  }, [usuarios, pagesUsuarios]);

  useEffect(() => {
    atualizarUsuarios(page, pageSize);
  }, [page, pageSize])

  const toogleModal = (usuario) => {
    editarUsuario && setEditarUsuario(false);
    setUsuario(usuario);
    setShowModal(!showModal);
  };

  const toogleEditarSenhaUsuario = (id) => {
    setEditarUsuario(!editarUsuario);
    setIdUsuarioEditar(id || null);
  }

  if (loading) return <Load animate={animate} color1={color1} color2={color2} color3={color3} index={0} />;

  return (
    <UsuariosBody style={{ position: 'relative', zIndex: 0 }}>

      <Shader animate={animate} color1={color1} color2={color2} color3={color3} index={-1} />
      <Typography variant="h3" mt={3} mb={2} sx={{ display: 'flex', alignItems: 'center', fontFamily: "Bebas Neue" }}><ArrowCircleLeftOutlined sx={{ cursor: 'pointer', fontSize: '45px', marginRight: 1 }} onClick={handleOpenProject} />{idEmpresa == 1 ? "Human Consulting" : nomeEmpresa} - Gerenciamento de Usuários</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, borderBottom: 'solid white 1px' }}>
        <TextField
          onChange={(e) => filtrarUsuarios(e.target.value)}
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
          }} />
        {usuarioLogado.permissao == "FUNC" ? null : <Button onClick={() => toogleModal(null)} variant="contained" color="primary">Adicionar Usuário</Button>}
      </Box>
      {usuariosFiltrados.length > 0 ?
        <>
          <Tabela usuarios={usuariosFiltrados} toogleModal={toogleModal} atualizarUsuarios={atualizarUsuarios} />

          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 2 }}>
            <Pagination
              count={pagesUsuarios}
              page={page + 1}
              onChange={(e, value) => setPage(value - 1)}
              color="primary"
              sx={{ "& .MuiPaginationItem-root": { color: "#fff" } }}
            />
          </Stack>

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
      <Modal showModal={showModal} fechar={toogleModal} editarSenhaUsuario={toogleEditarSenhaUsuario} editarUsuario={editarUsuario}
        form={editarUsuario ? <FormsEditarSenhaUsuario idUsuario={idUsuarioEditar} atualizarUsuarios={atualizarUsuarios} editarSenhaUsuario={toogleEditarSenhaUsuario} /> : <FormsUsuario diretor={usuariosFiltrados.length > 0 && (
          usuariosFiltrados.some(usuario => usuario.permissao.includes('DIRETOR')))} usuario={usuario} toogleModal={toogleModal} atualizarUsuarios={atualizarUsuarios} fkEmpresa={idEmpresa} qtdUsuarios={usuarios.length} editarSenhaUsuario={toogleEditarSenhaUsuario} />}
      >
      </Modal>
    </UsuariosBody >
  )
}

export default Usuarios;
