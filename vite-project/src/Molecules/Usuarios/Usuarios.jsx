import { useEffect, useState } from "react";
import FormsUsuario from "../Forms/FormsUsuario";
import Modal from "../Modal/Modal";
import Tabela from "../Tabela/Tabela";
import { UsuariosBody } from './Usuarios.styles'
import { ShaderGradient, ShaderGradientCanvas } from 'shadergradient'
import { Box, Typography, Button, TextField, Stack } from '@mui/material';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { useNavigate, useParams } from "react-router";
import SearchOffIcon from '@mui/icons-material/SearchOff';
import FormsEditarSenhaUsuario from "../Forms/FormsEditarSenhaUsuario";

const Usuarios = ({ toogleLateralBar, usuarios, atualizarUsuarios }) => {

  const navigate = useNavigate();
  const { idEmpresa, nomeEmpresa } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [editarUsuario, setEditarUsuario] = useState(false);
  const [idUsuarioEditar, setIdUsuarioEditar] = useState(null);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);

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
    toogleLateralBar();
    setUsuariosFiltrados(usuarios);
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

  return (
    <UsuariosBody style={{ position: 'relative', zIndex: 0 }}>

      <ShaderGradientCanvas
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
        }}
      >

        <ShaderGradient
          control='query'
          urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=180&cDistance=2.8&cPolarAngle=80&cameraZoom=8.3&color1=%23606080&color2=%238d7dca&color3=%234e5e8c&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=60&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=2.4&positionX=-1.3&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=40&rotationY=170&rotationZ=-60&shader=defaults&type=sphere&uAmplitude=1.7&uDensity=1.2&uFrequency=0&uSpeed=0.1&uStrength=2.1&uTime=8&wireframe=false&zoomOut=true'
        />
      </ShaderGradientCanvas>
      <Typography variant="h3" mt={3} mb={2} sx={{ display: 'flex', alignItems: 'center', fontFamily: "Bebas Neue" }}><ArrowCircleLeftOutlinedIcon sx={{ cursor: 'pointer', fontSize: '45px', marginRight: 1 }} onClick={handleOpenProject} />{idEmpresa == 1 ? "Human Consulting" : nomeEmpresa} - Gerenciamento de Usuários</Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, borderBottom: 'solid white 1px' }}>
        <TextField
          onChange={(e) => filtrarUsuarios(e.target.value)}
          label="Buscar usuário..."
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
            <SearchOffIcon sx={{ fontSize: '5rem' }} />
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
