import { useState } from "react";
import { postUsuario, putUsuario } from '../../Utils/cruds/CrudsUsuario.jsx';
import { useParams } from "react-router";
import { Box, Button, TextField, Typography, Stack, MenuItem, Grow, Select } from '@mui/material';
import { inputStyle } from "./Forms.styles.jsx";
import SendIcon from '@mui/icons-material/Send';

const FormsUsuario = ({ diretor, usuario, toogleModal, atualizarUsuarios, qtdUsuarios }) => {

    const { idEmpresa } = useParams();

    const [nome, setNome] = useState(usuario?.nome || '');
    const [email, setEmail] = useState(usuario?.email || '');
    const [senha, setSenha] = useState(usuario?.senha || '');
    const [cargo, setCargo] = useState(usuario?.cargo || '');
    const [area, setArea] = useState(usuario?.area || '');
    const [permissao, setPermissao] = useState(usuario?.permissao || "#");

    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

    const handlePostUsuario = async () => {

        const newUsuario = { nome, email, senha, cargo, area, permissao, fkEmpresa: idEmpresa, idEditor: usuarioLogado.idUsuario, permissaoEditor: usuarioLogado.permissao };
        await postUsuario(newUsuario, toogleModal);
        atualizarUsuarios();
    };

    const handlePutUsuario = async () => {

        const modifiedUsuario = {
            idEditor: usuarioLogado.idUsuario,
            permissaoEditor: usuarioLogado.permissao,
            idUsuario: usuario.idUsuario,
            nome,
            email,
            senha,
            cargo,
            area,
            permissao
        }
        await putUsuario(modifiedUsuario, usuario.idUsuario, toogleModal);
        atualizarUsuarios();
    }

    const mostrarPermissaoSelect = (
        (usuario == null && usuarioLogado.permissao != 'FUNC') ||
        (usuario != null && (
            usuarioLogado.permissao.includes('DIRETOR') ||
            usuarioLogado.permissao.includes('CONSULTOR') ||
            (usuarioLogado.permissao === 'GESTOR' && ['GESTOR', 'FUNC'].includes(usuario.permissao))
        ))
    ) && usuario?.permissao !== 'DIRETOR';

    return (
        <Box component="form" onSubmit={(e) => e.preventDefault()} display="flex" flexDirection="column" gap={2}>
            <Typography variant="h5" textAlign="center" mb={2}>
                {usuario == null ? "Adicionar Usuário" : "Editar Usuário"}
            </Typography>

            <TextField
                label="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                fullWidth
                variant="outlined"
                autoComplete="off"
                InputLabelProps={{ style: inputStyle.label }}
                InputProps={{ style: inputStyle.input }}
                sx={inputStyle.sx}
            />

            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                variant="outlined"
                autoComplete="off"
                InputLabelProps={{ style: inputStyle.label }}
                InputProps={{ style: inputStyle.input }}
                sx={inputStyle.sx}
            />

            {usuario == null && (
                <TextField
                    label="Senha"
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    fullWidth
                    variant="outlined"
                    autoComplete="off"
                    InputLabelProps={{ style: inputStyle.label }}
                    InputProps={{ style: inputStyle.input }}
                    sx={inputStyle.sx}
                />
            )}

            {usuarioLogado.permissao !== 'FUNC' && (
                <>
                    <TextField
                        label="Cargo"
                        value={cargo}
                        onChange={(e) => setCargo(e.target.value)}
                        fullWidth
                        variant="outlined"
                        autoComplete="off"
                        InputLabelProps={{ style: inputStyle.label }}
                        InputProps={{ style: inputStyle.input }}
                        sx={inputStyle.sx}
                    />

                    <TextField
                        label="Área"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        fullWidth
                        variant="outlined"
                        autoComplete="off"
                        InputLabelProps={{ style: inputStyle.label }}
                        InputProps={{ style: inputStyle.input }}
                        sx={inputStyle.sx}
                    />

                    {mostrarPermissaoSelect && (
                        <Select
                            value={permissao}
                            onChange={(e) => setPermissao(e.target.value)}
                            fullWidth
                            displayEmpty
                            variant="outlined"
                            sx={{
                                ...inputStyle.sx,
                                color: '#FFF',
                            }}
                            MenuProps={{
                                TransitionComponent: Grow,
                                PaperProps: {
                                    sx: {
                                        backgroundColor: '#22272B',
                                        color: '#fff',
                                        borderRadius: 2,
                                        mt: 1,
                                        maxHeight: 200,
                                    }
                                }
                            }}
                        >
                            <MenuItem key="#" value="#">
                                Selecione a permissão
                            </MenuItem>
                            {idEmpresa == 1 ? (
                                [
                                    <MenuItem key="CONSULTOR_DIRETOR" value="CONSULTOR_DIRETOR">Diretor</MenuItem>,
                                    <MenuItem key="CONSULTOR" value="CONSULTOR">Consultor</MenuItem>
                                ]
                            ) : (
                                qtdUsuarios >= 1 && diretor ? (
                                    [
                                        <MenuItem key="GESTOR" value="GESTOR">Gestão</MenuItem>,
                                        <MenuItem key="FUNC" value="FUNC">Team Member</MenuItem>
                                    ]
                                ) : qtdUsuarios >= 1 && !diretor ? (
                                    [
                                        <MenuItem key="GESTOR" value="GESTOR">Gestão</MenuItem>,
                                        <MenuItem key="FUNC" value="FUNC">Team Member</MenuItem>,
                                        <MenuItem key="DIRETOR" value="DIRETOR">Diretor</MenuItem>
                                    ]
                                ) : (
                                    <MenuItem key="DIRETOR" value="DIRETOR">Diretor</MenuItem>
                                )
                            )}
                        </Select>
                    )}
                </>
            )}

            <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
                {usuario == null ? (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePostUsuario}
                        endIcon={<SendIcon />}
                        sx={{ flex: 1 }}
                    >
                        Adicionar
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handlePutUsuario}
                        endIcon={<SendIcon />}
                        sx={{ flex: 1 }}
                    >
                        Salvar Alterações
                    </Button>
                )}
            </Stack>
        </Box>
    )
}

export default FormsUsuario