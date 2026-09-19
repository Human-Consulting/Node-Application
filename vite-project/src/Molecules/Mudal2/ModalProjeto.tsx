import { Box, Button, Dialog, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProjeto, postProjeto, putProjeto, ProjetoPayload, EditorBody } from '../../Utils/cruds/CrudsProjeto';
import { getUsuariosResponsaveis, Usuario, PagedResponse } from "../../Utils/cruds/CrudsUsuario";
import SelectUsuarios from "../Modais/SelectUsuarios/SelectUsuarios";
import { AttachFile, Close, Delete, Send } from "@mui/icons-material";
import { useWarningValidator } from "../../Utils/useWarning";
import { inputStyle } from "../Modal/Forms/Forms.styles";
import { ChangeEvent, useEffect, useState } from "react";
import { Content, Actions } from "./Modal.style";
import { useAuth } from "../../context/AuthContext";
import { ProjectsCardItem } from "../ProjectsCard/ProjectsCard";

interface ModalProjetoProps {
    open: boolean;
    onClose: () => void;
    projeto?: ProjectsCardItem | null;
    toogleModal: () => void;
    atualizarProjetos: (page?: number, nome?: string | null) => void | Promise<unknown>;
    fkEmpresa?: number | string;
}

interface ProjetoErros {
    titulo?: string;
    descricao?: string;
    orcamento?: string;
    fkResponsavel?: string;
}

const ModalProjeto = ({ open, onClose, projeto, toogleModal, atualizarProjetos, fkEmpresa }: ModalProjetoProps) => {
    const queryClient = useQueryClient();

    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [sizeUsuarios, setSizeUsuarios] = useState(5);
    const [pagesUsuarios, setTotalPagesUsuarios] = useState(1);

    const [titulo, setTitulo] = useState(projeto?.titulo || '');
    const [descricao, setDescricao] = useState(projeto?.descricao || '');
    const [orcamento, setOrcamento] = useState<number | string>(projeto?.orcamento || 0);
    const [responsavel, setResponsavel] = useState(projeto?.responsavel || null);
    const [fkResponsavel, setFkResponsavel] = useState<string | number>((projeto?.responsavel?.idUsuario as string | number | undefined) ?? '#');
    const [urlImagem, setUrlImagem] = useState('');
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        resolveInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projeto])

    const resolveInfo = () => {
        setTitulo(projeto?.titulo || '')
        setDescricao(projeto?.descricao || '')
        setOrcamento(projeto?.orcamento || 0)
        setResponsavel(projeto?.responsavel || null)
        setFkResponsavel((projeto?.responsavel?.idUsuario as string | number | undefined) ?? '#')
        setUrlImagem(projeto?.urlImagem || '')
    }

    // On-demand paginated/searchable dropdown fetch, following the same
    // fetchQuery-on-demand convention used by MainContent's buscarUsuarios /
    // Usuarios.tsx's atualizarUsuarios for interactive, child-driven lists.
    const buscarUsuarios = async (page = 0, nome?: string | null): Promise<PagedResponse<Usuario> | null> => {
        const usuariosRetornados = await queryClient.fetchQuery({
            queryKey: ['usuariosResponsaveis', fkEmpresa, page, nome ?? null],
            queryFn: () => getUsuariosResponsaveis(Number(fkEmpresa), page, 4, nome),
        });
        setUsuarios(usuariosRetornados?.content || []);
        setSizeUsuarios(usuariosRetornados?.pageSize || 10);
        setTotalPagesUsuarios(usuariosRetornados?.totalPages || 1);
        return usuariosRetornados;
    };

    const [erros, setErros] = useState<ProjetoErros>({});

    const { usuario: usuarioLogado } = useAuth();

    const handleFileUpload = (file?: File) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64String = (reader.result as string).split(',')[1];
            setUrlImagem(base64String);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const validarCampos = () => {
        const novosErros: ProjetoErros = {};

        if (!titulo.trim()) novosErros.titulo = "Título é obrigatório";
        if (!descricao.trim()) novosErros.descricao = "Descrição é obrigatória";
        if (!orcamento) novosErros.orcamento = "Orçamento é obrigatório";
        if (!validarPermissaoFunc() && fkResponsavel === "#") novosErros.fkResponsavel = "Responsável é obrigatório";

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    const invalidarProjetos = () => queryClient.invalidateQueries({ queryKey: ['projetos', fkEmpresa] });

    const postProjetoMutation = useMutation({
        mutationFn: (payload: ProjetoPayload) => postProjeto(payload),
    });

    const putProjetoMutation = useMutation({
        mutationFn: ({ payload, idProjeto }: { payload: Partial<ProjetoPayload> & EditorBody; idProjeto: number | string }) =>
            putProjeto(payload, idProjeto),
    });

    const deleteProjetoMutation = useMutation({
        mutationFn: ({ idProjeto, body }: { idProjeto: number | string; body: EditorBody }) =>
            deleteProjeto(idProjeto, body),
    });

    const handlePostProjeto = async () => {
        if (!validarCampos()) return;
        setErros({});
        const newProjeto: ProjetoPayload = { fkEmpresa, titulo, descricao, orcamento, fkResponsavel, urlImagem, idEditor: usuarioLogado?.idUsuario, permissaoEditor: usuarioLogado?.permissao };
        const response = await postProjetoMutation.mutateAsync(newProjeto);
        if (response) {
            await invalidarProjetos();
            toogleModal();
            atualizarProjetos();
        }
    };

    const handleDeleteProjeto = async () => {
        if (projeto?.idProjeto == null) return;
        const bodyDelete: EditorBody = { idEditor: usuarioLogado?.idUsuario, permissaoEditor: usuarioLogado?.permissao };
        const response = await deleteProjetoMutation.mutateAsync({ idProjeto: projeto.idProjeto, body: bodyDelete });
        if (response) {
            await invalidarProjetos();
            toogleModal();
            await atualizarProjetos();
        }
    }

    const handlePutProjeto = async () => {
        if (!validarCampos()) return;
        setErros({});
        if (projeto?.idProjeto == null) return;
        const modifiedProjeto: Partial<ProjetoPayload> & EditorBody = {
            idEditor: usuarioLogado?.idUsuario,
            permissaoEditor: usuarioLogado?.permissao,
            titulo,
            descricao,
            orcamento,
            fkResponsavel,
            urlImagem
        }
        const response = await putProjetoMutation.mutateAsync({ payload: modifiedProjeto, idProjeto: projeto.idProjeto });
        if (response) {
            await invalidarProjetos();
            toogleModal();
            await atualizarProjetos();
        }
    }

    const validarPermissaoConsultor = () => {
        return !usuarioLogado?.permissao?.includes('CONSULTOR')
    }

    const validarPermissaoFunc = () => {
        return usuarioLogado?.permissao == 'FUNC'
    }

    const removerErro = (campo: keyof ProjetoErros) => {
        setErros((prevErros) => {
            const { [campo]: _removed, ...resto } = prevErros;
            return resto;
        });
    };

    useEffect(() => {
        buscarUsuarios();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projeto])

    const handleOnClose = () => {
        resolveInfo();
        onClose();
    }

    return (
        <>
            <Dialog open={open} onClose={handleOnClose} fullWidth maxWidth="xs">
                <Content>
                    <Box display="flex" justifyContent={useWarningValidator(projeto) !== null ? "space-between" : "flex-end"} alignItems="center">
                        {useWarningValidator(projeto)}
                        <Close onClick={handleOnClose} style={{ cursor: "pointer" }} />
                    </Box>
                    <Stack gap={3}>
                        <Typography width="100%" textAlign="center" color="#fff" fontWeight="bold" fontSize={18}>
                            {projeto == null ? "Criar Projeto" : "Editar Projeto"}
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
                            InputLabelProps={{ sx: inputStyle.label }}
                            InputProps={{ sx: inputStyle.input }}
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
                            InputLabelProps={{ sx: inputStyle.label }}
                            InputProps={{ sx: inputStyle.input }}
                            sx={inputStyle.sx}
                            error={!!erros.descricao}
                            helperText={erros.descricao}
                        />
                        {usuarioLogado?.permissao?.includes('CONSULTOR') && (
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
                                InputLabelProps={{ sx: inputStyle.label }}
                                InputProps={{ sx: inputStyle.input }}
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
                            onChange={(e: SelectChangeEvent) => {
                                removerErro("fkResponsavel")
                                setFkResponsavel(e.target.value)
                            }}
                            disabled={usuarioLogado?.permissao === 'FUNC'}
                            error={!!erros.fkResponsavel}
                        />
                        {usuarioLogado?.permissao != 'FUNC' && (
                            <Button
                                variant="contained"
                                component="label"
                                fullWidth
                                sx={{ ...inputStyle.sx, py: 1.5 }}
                            >
                                {projeto == null ? 'Selecionar' : 'Modificar'} Imagem
                                <AttachFile />
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                        const file = e.target.files?.[0];
                                        handleFileUpload(file);
                                        if (file) setFileName(file.name);
                                    }}
                                />
                                {fileName && (fileName)}
                            </Button>
                        )}

                    </Stack>
                </Content>
                <Actions>
                    {projeto == null ? (
                        <Button variant="contained" color="primary" onClick={handlePostProjeto} endIcon={<Send />}>
                            Adicionar
                        </Button>
                    ) : (
                        <>
                            {!usuarioLogado?.permissao?.includes("CONSULTOR") ? null :
                                <Button variant="contained" color="error" onClick={handleDeleteProjeto} >
                                    <Delete />
                                </Button>
                            }
                            <Button variant="contained" color="primary" onClick={handlePutProjeto} endIcon={<Send />} sx={{ flex: 1 }}>
                                Salvar Alterações
                            </Button>
                        </>
                    )}
                </Actions>
            </Dialog>
        </>
    );
}

export default ModalProjeto;
