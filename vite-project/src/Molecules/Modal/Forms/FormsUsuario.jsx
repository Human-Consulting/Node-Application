import { useState } from "react";
import { postUsuario, putUsuario } from '../../../Utils/cruds/CrudsUsuario.jsx';
import { useParams } from "react-router";
import { Box, Button, TextField, Typography, Stack, MenuItem, Grow, Select } from '@mui/material';
import { inputStyle } from "./Forms.styles.jsx";
import SendIcon from '@mui/icons-material/Send';

const FormsUsuario = ({ diretor, usuario, toogleModal, atualizarUsuarios, editarSenhaUsuario }) => {

    const { idEmpresa, nomeEmpresa } = useParams();

    const [nome, setNome] = useState(usuario?.nome || '');
    const [email, setEmail] = useState(usuario?.email || '');
    const [cargo, setCargo] = useState(usuario?.cargo || '');
    const [area, setArea] = useState(usuario?.area || '');
    const [permissao, setPermissao] = useState(usuario?.permissao || "#");

    const [erros, setErros] = useState({});

    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

    const handlePostUsuario = async () => {
        if (!validarCampos()) return;
        setErros({});
        const newUsuario = { nome, email, cargo, area: area.toUpperCase(), permissao, fkEmpresa: idEmpresa, idEditor: usuarioLogado.idUsuario, permissaoEditor: usuarioLogado.permissao };
        const response = await postUsuario(newUsuario);
        if (response) {
            atualizarUsuarios();
            toogleModal();
        }
    };

    const handlePutUsuario = async () => {
        if (!validarCampos()) return;
        setErros({});
        const modifiedUsuario = {
            idEditor: usuarioLogado.idUsuario,
            permissaoEditor: usuarioLogado.permissao,
            idUsuario: usuario.idUsuario,
            nome,
            email,
            cargo,
            area: area.toUpperCase(),
            permissao
        }
        const response = await putUsuario(modifiedUsuario, usuario.idUsuario);
        if (response) {
            atualizarUsuarios();
            toogleModal();
        }
    }
    const mostrarPermissaoSelect = (
        (usuario == null && usuarioLogado.permissao !== 'FUNC') ||

        (usuario != null && (() => {
            const perm = usuarioLogado.permissao;
            const target = usuario.permissao;

            if (usuarioLogado.idUsuario != usuario.idUsuario) return true;

            if (perm.includes('DIRETOR'))
                return !target.includes('DIRETOR');

            if (perm.includes('CONSULTOR_DIRETOR'))
                return ['GESTOR', 'CONSULTOR', 'FUNC'].includes(target);

            if (perm.includes('CONSULTOR'))
                return true; // consultor pode tudo

            if (perm === 'GESTOR')
                return ['GESTOR', 'FUNC'].includes(target);

            return false;
        })())
    );

    const handleEditarSenhaUsuario = () => {
        editarSenhaUsuario(usuario.idUsuario);
    }

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
        setErros((prevErros) => {
            const { [campo]: _, ...resto } = prevErros;
            return resto;
        });
    };


    return (
        <Box component="form" onSubmit={(e) => e.preventDefault()} display="flex" flexDirection="column" gap={2}>
            <Typography variant="h5" textAlign="center" mb={2}>
                {usuario == null ? "Adicionar Usuário" : "Editar Usuário"}
            </Typography>

            <TextField
                label="Nome"
                value={nome}
                onChange={(e) => {
                    removerErro("nome")
                    setNome(e.target.value)
                }}
                fullWidth
                variant="outlined"
                autoComplete="off"
                InputLabelProps={{ style: inputStyle.label }}
                InputProps={{ style: inputStyle.input }}
                sx={inputStyle.sx}
                error={!!erros.nome}
                helperText={erros.nome}
            />

            <TextField
                label="Email"
                value={email}
                onChange={(e) => {
                    removerErro("email")
                    setEmail(e.target.value)
                }}
                fullWidth
                variant="outlined"
                autoComplete="off"
                InputLabelProps={{ style: inputStyle.label }}
                InputProps={{ style: inputStyle.input }}
                sx={inputStyle.sx}
                error={!!erros.email}
                helperText={erros.email}
            />

            {usuarioLogado.permissao !== 'FUNC' && (
                <>
                    <TextField
                        label="Cargo"
                        value={cargo}
                        onChange={(e) => {
                            removerErro("cargo")
                            setCargo(e.target.value)
                        }}
                        fullWidth
                        variant="outlined"
                        autoComplete="off"
                        InputLabelProps={{ style: inputStyle.label }}
                        InputProps={{ style: inputStyle.input }}
                        sx={inputStyle.sx}
                        error={!!erros.cargo}
                        helperText={erros.cargo}
                    />

                    <TextField
                        label="Área"
                        value={area}
                        onChange={(e) => {
                            removerErro("area")
                            setArea(e.target.value)
                        }}
                        fullWidth
                        variant="outlined"
                        autoComplete="off"
                        InputLabelProps={{ style: inputStyle.label }}
                        InputProps={{ style: inputStyle.input }}
                        sx={inputStyle.sx}
                        error={!!erros.area}
                        helperText={erros.area}
                    />

                    {mostrarPermissaoSelect && (
                        <Select
                            value={permissao}
                            onChange={(e) => {
                                removerErro("permissao")
                                setPermissao(e.target.value)
                            }}
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
                            error={!!erros.permissao}
                        >
                            <MenuItem key="#" value="#">
                                Selecione a permissão
                            </MenuItem>
                            
                            {(() => {
                                const isEmpresas = nomeEmpresa === 'Empresas';
                                const isConsultor = usuarioLogado.permissao.includes('CONSULTOR');

                                if (isEmpresas) {
                                    if (!diretor) {
                                        return (
                                            <MenuItem key="CONSULTOR_DIRETOR" value="CONSULTOR_DIRETOR">
                                                Consultor Diretor
                                            </MenuItem>
                                        );
                                    } else {
                                        return (
                                            <>
                                            {isConsultor && (<MenuItem key="CONSULTOR" value="CONSULTOR">Consultor</MenuItem>)}
                                                <MenuItem key="GESTOR" value="GESTOR">Gestor</MenuItem>
                                                <MenuItem key="FUNC" value="FUNC">Team Member</MenuItem>
                                            </>
                                        );
                                    }
                                } else {
                                    if (!diretor) {
                                        return (
                                            <MenuItem key="DIRETOR" value="DIRETOR">
                                                Diretor
                                            </MenuItem>
                                        );
                                    } else {
                                        return (
                                            <>
                                                {isConsultor && (<MenuItem key="CONSULTOR" value="CONSULTOR">Consultor</MenuItem>)}
                                                <MenuItem key="GESTOR" value="GESTOR">Gestor</MenuItem>
                                                <MenuItem key="FUNC" value="FUNC">Team Member</MenuItem>
                                            </>
                                        );
                                    }
                                }
                            })()}
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
                    <>
                        {
                            usuario.idUsuario == usuarioLogado.idUsuario && (
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={handleEditarSenhaUsuario}
                                    sx={{ flex: 1 }}
                                >
                                    EDITAR SENHA
                                </Button>
                            )
                        }
                        < Button
                            variant="contained"
                            color="primary"
                            onClick={handlePutUsuario}
                            endIcon={<SendIcon />}
                            sx={{ flex: 1 }}
                        >
                            SALVAR
                        </Button>
                    </>
                )}
            </Stack>
        </Box >
    )
}

export default FormsUsuario