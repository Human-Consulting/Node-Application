import { useEffect, useState } from "react";
import FormsUsuario from "../Forms/FormsUsuario";
import Modal from "../Modal/Modal";
import Tabela from "../Tabela/Tabela";
import { UsuariosBody } from './Usuarios.styles'
import { Box, Typography, Button, TextField } from '@mui/material';
const Usuarios = ({ toogleLateralBar, usuarios, atualizarUsuarios, idEmpresa }) => {

    const [showModal, setShowModal] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
    
      const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
    
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
        setUsuario(usuario);
        setShowModal(!showModal);
    };

    return (
        <UsuariosBody>
            <Typography variant="h3" mt={3} mb={2}>Gerenciamento de Usuários</Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, borderBottom: 'solid white 1px' }}>
                <TextField
                    label="Buscar usuário..."
                    size="large"
                    InputLabelProps={{ sx: { color: "white" } }}
                    InputProps={{sx: {color: "white"}}}
                    onChange={(e) => filtrarUsuarios(e.target.value)} />
                {usuarioLogado.permissao == "FUNC" ? null : <Button onClick={() => toogleModal(null)} variant="contained" color="primary">Adicionar Usuário</Button>}
            </Box>
            <Tabela usuarios={usuariosFiltrados} toogleModal={toogleModal} atualizarUsuarios={atualizarUsuarios} />
            <Modal showModal={showModal} fechar={toogleModal}
                form={<FormsUsuario usuario={usuario} toogleModal={toogleModal} atualizarUsuarios={atualizarUsuarios} fkEmpresa={idEmpresa} qtdUsuarios={usuarios.length} />}
            >
            </Modal>
        </UsuariosBody>
    )
}

export default Usuarios;
