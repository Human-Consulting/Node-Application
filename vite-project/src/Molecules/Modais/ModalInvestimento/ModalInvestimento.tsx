import { Popover, List, ListItem, ListItemText, Typography, Button, Stack } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteInvestimento, Investimento, EditorBody } from '../../../Utils/cruds/CrudsInvestimento';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useParams } from 'react-router';
import { useAuth } from '../../../context/AuthContext';
dayjs.extend(utc);

interface ModalInvestimentoProps {
    investimentos: Investimento[];
    open: boolean;
    anchorEl: HTMLElement | null;
    onClose: () => void;
    toogleModal: (investimento: Investimento | null) => void;
    atualizarEntidade: () => void | Promise<unknown>;
}

const ModalInvestimento = ({ investimentos, open, anchorEl, onClose, toogleModal, atualizarEntidade }: ModalInvestimentoProps) => {
    const id = open ? 'investimentos-popover' : undefined;
    const { usuario: usuarioLogado } = useAuth();
    const { idProjeto } = useParams();
    const queryClient = useQueryClient();

    // Same invalidation targets as Mudal2/ModalInvestimento.tsx's own
    // create/edit mutations, so a delete here keeps Dashboard's
    // ['dashboard', idProjeto] / ['burndown', idProjeto] caches in sync too.
    const invalidarDashboard = () => Promise.all([
        queryClient.invalidateQueries({ queryKey: ['dashboard', idProjeto] }),
        queryClient.invalidateQueries({ queryKey: ['burndown', idProjeto] }),
    ]);

    const deleteInvestimentoMutation = useMutation({
        mutationFn: ({ idInvestimento, body }: { idInvestimento: number | string; body: EditorBody }) =>
            deleteInvestimento(idInvestimento, body),
    });

    const handleDeleteInvestimento = async (idInvestimento: number | string | undefined) => {
        onClose();
        if (idInvestimento == null) return;
        const bodyDelete: EditorBody = { idEditor: usuarioLogado?.idUsuario, permissaoEditor: usuarioLogado?.permissao };
        const response = await deleteInvestimentoMutation.mutateAsync({ idInvestimento, body: bodyDelete });
        if (response) await invalidarDashboard();
        await atualizarEntidade();
    }

    const handleToogleModal = (investimento: Investimento | null) => {
        onClose();
        toogleModal(investimento);
    }

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'left',
            }}
        >
            <List sx={{ width: 450, height: 450, background: 'background.default', padding: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                {usuarioLogado?.permissao != 'FUNC' && (
                    <ListItem sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        <Button variant="contained" color='primary' onClick={() => handleToogleModal(null)}>Adicionar investimento</Button>
                    </ListItem>
                )}
                {investimentos.map((investimento, index) => (
                    <ListItem key={index} sx={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'background.paper', borderRadius: '16px', transition: '0.2s', "&:hover": { background: '#181818' } }}>
                        <Stack sx={{ flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                            <ListItemText
                                primary={
                                    <Typography variant="subtitle1" fontWeight="bold" color="text.primary">
                                        {investimento.descricao || 'Sem descrição'}
                                    </Typography>
                                }
                                secondary={
                                    <>
                                        <Typography variant="body1" color="text.primary">
                                            Valor: R${investimento.valor}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            Data: {dayjs.utc(investimento.dtInvestimento).format('DD/MM/YYYY')}
                                        </Typography>

                                    </>
                                }
                            />
                        </Stack>
                        <Stack sx={{ flexDirection: 'row', gap: 1 }}>
                            <Button sx={{ borderWidth: '2px' }} variant="outlined" color='error' onClick={() => handleDeleteInvestimento(investimento.idInvestimento)}><Delete /></Button>
                            <Button sx={{ borderWidth: '2px' }} variant="outlined" onClick={() => handleToogleModal(investimento)}><Edit /></Button>
                        </Stack>
                    </ListItem>
                ))}
                {investimentos.length === 0 && (
                    <Typography variant="body2" sx={{ p: 2, textAlign: 'center' }}>
                        Nenhum investimento realizado ainda!
                    </Typography>
                )}
            </List>
        </Popover>
    );
};

export default ModalInvestimento;
