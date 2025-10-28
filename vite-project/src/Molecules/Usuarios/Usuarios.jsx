import { useEffect, useState } from "react";
import FormsUsuario from "../Forms/FormsUsuario";
import Modal from "../Modal/Modal";
import Tabela from "../Tabela/Tabela";
import { UsuariosBody } from './Usuarios.styles'
import { Box, Typography, Button, TextField, Stack } from '@mui/material';
import { useNavigate, useParams } from "react-router";
import FormsEditarSenhaUsuario from "../Forms/FormsEditarSenhaUsuario";
import Shader from "../Shader/Shader";
import { ArrowCircleLeftOutlined, Search, SearchOff } from '@mui/icons-material'

const Usuarios = ({ toogleLateralBar, usuarios, atualizarUsuarios, color1, color2, color3, animate, telaAtual }) => {

  const navigate = useNavigate();
  const { idEmpresa, nomeEmpresa } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [editarUsuario, setEditarUsuario] = useState(false);
  const [idUsuarioEditar, setIdUsuarioEditar] = useState(null);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [loading, setLoading] = useState(false);

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  if (!usuarioLogado.permissao.includes("CONSULTOR") && idEmpresa == 1) navigate(-1);

  const handleOpenProject = async () => {
    navigate(`/Home/${nomeEmpresa}/${idEmpresa}`)
  }

  const filtrarUsuarios = (texto) => {
    if (texto !== '') {
      const textoLower = texto.toLowerCase();
      const usuariosFiltrados = usuarios.filter(usuario => {
        const palavras = (usuario.nome ?? '').toLowerCase().split(' ');
        return palavras.some(palavra => palavra.startsWith(textoLower));
      });
      setUsuariosFiltrados(usuariosFiltrados);

    } else {
      setUsuariosFiltrados(usuarios);
    }
  }

  useEffect(() => {
    setLoading(true);
    toogleLateralBar();
    telaAtual();
    setUsuariosFiltrados(usuarios);
    setLoading(false);
  }, [usuarios]);

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
          label={<Stack sx={{ flexDirection: 'row', gap: 0.5 }}> <Search/> Buscar usuário...</Stack>}
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
      {usuariosFiltrados.length > 0 ? (
        <Tabela usuarios={usuariosFiltrados} toogleModal={toogleModal} atualizarUsuarios={atualizarUsuarios} />
      ) :
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
          usuariosFiltrados.some(usuario => usuario.permissao === 'DIRETOR'))} usuario={usuario} toogleModal={toogleModal} atualizarUsuarios={atualizarUsuarios} fkEmpresa={idEmpresa} qtdUsuarios={usuarios.length} editarSenhaUsuario={toogleEditarSenhaUsuario} />}
      >
      </Modal>
    </UsuariosBody>
  )
}

export default Usuarios;
