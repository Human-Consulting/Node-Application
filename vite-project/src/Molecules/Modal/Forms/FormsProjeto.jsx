import { useEffect, useState } from "react";
import { deleteProjeto, postProjeto, putProjeto } from '../../../Utils/cruds/CrudsProjeto.jsx';
import { Box, Button, TextField, Typography, Stack } from '@mui/material';
import { inputStyle } from "./Forms.styles.jsx";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SelectUsuarios from "../../Modais/SelectUsuarios/SelectUsuarios.jsx";
import { getUsuariosResponsaveis } from "../../../Utils/cruds/CrudsUsuario.jsx";

const FormsProjeto = ({ projeto, toogleModal, atualizarProjetos, fkEmpresa }) => {

    const [usuarios, setUsuarios] = useState([]);
    const [sizeUsuarios, setSizeUsuarios] = useState(5);
    const [pagesUsuarios, setTotalPagesUsuarios] = useState(1);

    const [titulo, setTitulo] = useState(projeto?.titulo || "");
    const [descricao, setDescricao] = useState(projeto?.descricao || "");
    const [orcamento, setOrcamento] = useState(projeto?.orcamento || "");
    const [responsavel, setResponsavel] = useState(projeto?.responsavel || {});
    const [fkResponsavel, setFkResponsavel] = useState(projeto?.responsavel?.idUsuario || '#');
    const [urlImagem, setUrlImagem] = useState('');
    const [fileName, setFileName] = useState('');

    const buscarUsuarios = async (page = 0, size = 4) => {
        const usuariosRetornados = await getUsuariosResponsaveis(Number(fkEmpresa), page, size);
        setUsuarios(usuariosRetornados?.content || []);
        setSizeUsuarios(usuariosRetornados?.pageSize || 10);
        setTotalPagesUsuarios(usuariosRetornados?.totalPages || 1);
    };

    const [erros, setErros] = useState({});

    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

    const handleFileUpload = (file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = reader.result.split(',')[1];
            setUrlImagem(base64String);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const validarCampos = () => {
        const novosErros = {};

        if (!titulo.trim()) novosErros.titulo = "Título é obrigatório";
        if (!descricao.trim()) novosErros.descricao = "Descrição é obrigatória";
        if (!orcamento) novosErros.orcamento = "Orçamento é obrigatório";
        if (!validarPermissaoFunc() && fkResponsavel === "#") novosErros.fkResponsavel = "Responsável é obrigatório";

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    const handlePostProjeto = async () => {
        if (!validarCampos()) return;
        setErros({});
        const newProjeto = { fkEmpresa, titulo, descricao, orcamento, fkResponsavel, urlImagem, idEditor: usuarioLogado.idUsuario, permissaoEditor: usuarioLogado.permissao };
        const response = await postProjeto(newProjeto);
        if (response) {
            toogleModal();
            atualizarProjetos();
        }
    };

    const handleDeleteProjeto = async () => {
        const bodyDelete = { idEditor: usuarioLogado.idUsuario, permissaoEditor: usuarioLogado.permissao }
        const response = await deleteProjeto(projeto.idProjeto, bodyDelete);
        if (response) {
            toogleModal();
            await atualizarProjetos();
        }
    }

    const handlePutProjeto = async () => {
        if (!validarCampos()) return;
        setErros({});
        const modifiedProjeto = {
            idEditor: usuarioLogado.idUsuario,
            permissaoEditor: usuarioLogado.permissao,
            titulo,
            descricao,
            orcamento,
            fkResponsavel,
            urlImagem
        }
        const response = await putProjeto(modifiedProjeto, projeto.idProjeto);
        if (response) {
            toogleModal();
            await atualizarProjetos();
        }
    }

    const validarPermissaoConsultor = () => {
        return !usuarioLogado.permissao.includes('CONSULTOR')
    }

    const validarPermissaoFunc = () => {
        return usuarioLogado.permissao == 'FUNC'
    }

    const removerErro = (campo) => {
        setErros((prevErros) => {
            const { [campo]: _, ...resto } = prevErros;
            return resto;
        });
    };

    useEffect(() => {
        buscarUsuarios();
    }, [])

    return (
        <Box component="form" onSubmit={(e) => e.preventDefault()} display="flex" flexDirection="column" gap={2}>
            <Typography variant="h5" textAlign="center" mb={2}>
                {projeto == null ? "Adicionar Projeto" : "Visualizar Projeto"}
            </Typography>

            <TextField
                label="Título"
                type="text"
                disabled={validarPermissaoFunc()}
                value={titulo}
                onChange={(e) => {
                    setTitulo(e.target.value)
                    removerErro("titulo")
                }}
                fullWidth
                variant="outlined"
                InputLabelProps={{ style: inputStyle.label }}
                InputProps={{ style: inputStyle.input }}
                sx={inputStyle.sx}
                error={!!erros.titulo}
                helperText={erros.titulo}
            />
            <TextField
                label="Descrição"
                multiline
                rows={3}
                disabled={validarPermissaoFunc()}
                value={descricao}
                onChange={(e) => {
                    setDescricao(e.target.value)
                    removerErro("descricao")
                }}
                fullWidth
                variant="outlined"
                InputLabelProps={{ style: inputStyle.label }}
                InputProps={{ style: inputStyle.input }}
                sx={inputStyle.sx}
                error={!!erros.descricao}
                helperText={erros.descricao}
            />
            {usuarioLogado.permissao.includes('CONSULTOR') && (
                <TextField
                    label="Orçamento"
                    type="number"
                    disabled={validarPermissaoConsultor()}
                    value={orcamento}
                    onChange={(e) => {
                        setOrcamento(e.target.value)
                        removerErro("orcamento")
                    }}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ style: inputStyle.label }}
                    InputProps={{ style: inputStyle.input }}
                    sx={inputStyle.sx}
                    error={!!erros.orcamento}
                    helperText={erros.orcamento}
                />
            )}
            <SelectUsuarios
                usuarios={usuarios}
                sizeUsuarios={sizeUsuarios}
                pagesUsuarios={pagesUsuarios}
                atualizarUsuarios={buscarUsuarios}
                responsavel={responsavel}
                fkResponsavel={fkResponsavel}
                onChange={(e) => {
                    removerErro("fkResponsavel")
                    setFkResponsavel(e.target.value)
                }}
                disabled={usuarioLogado.permissao === 'FUNC'}
                error={!!erros.fkResponsavel}
            />
            {usuarioLogado.permissao != 'FUNC' && (
                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    sx={{ ...inputStyle.sx, py: 1.5 }}
                >
                    {projeto == null ? 'Selecionar' : 'Modificar'} Imagem
                    <AttachFileIcon />
                    <input
                        type="file"
                        hidden
                        onChange={(e) => {
                            handleFileUpload(e.target.files[0]);
                            setFileName(e.target.files[0].name);
                            // removerErro("hidde")
                        }}
                    />
                    {fileName && (fileName)}
                </Button>
            )}
            <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
                {projeto == null ? (
                    <Button variant="contained" color="primary" onClick={handlePostProjeto} endIcon={<SendIcon />} sx={{ flex: 1 }}>
                        Adicionar
                    </Button>
                ) : (
                    <>
                        {!usuarioLogado.permissao.includes("CONSULTOR") ? null :
                            <Button variant="contained" color="error" onClick={handleDeleteProjeto} >
                                <DeleteIcon />
                            </Button>
                        }
                        <Button variant="contained" color="primary" onClick={handlePutProjeto} endIcon={<SendIcon />} sx={{ flex: 1 }}>
                            Salvar Alterações
                        </Button>
                    </>
                )}
            </Stack>
        </Box>
    )
}

export default FormsProjeto