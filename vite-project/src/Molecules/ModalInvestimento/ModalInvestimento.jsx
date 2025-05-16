import { Popover, List, ListItem, ListItemText, Typography, Button, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { deleteInvestimento } from '../../Utils/cruds/CrudsInvestimento.jsx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const ModalInvestimento = ({ investimentos, open, anchorEl, onClose, toogleModal, atualizarEntidade }) => {
    const id = open ? 'investimentos-popover' : undefined;
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

    const handleDeleteInvestimento = async (idInvestimento) => {
        onClose();
        const bodyDelete = {idEditor: usuarioLogado.idUsuario, permissaoEditor: usuarioLogado.permissao};
        await deleteInvestimento(idInvestimento, bodyDelete);
        await atualizarEntidade();
    }

    const handleToogleModal = (investimento) => {
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
            <List sx={{ width: 400, height: 400, background: '#000' }}>
                {usuarioLogado.permissao != 'FUNC' && !usuarioLogado.permissao.includes("CONSULTOR") && (
                    <ListItem sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                        <Button variant="contained" color='primary' onClick={() => handleToogleModal(null)}>Adicionar investimento</Button>
                    </ListItem>
                )}
                {investimentos.map((investimento, index) => (
                    <ListItem key={index} sx={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#000' }}>
                        <Stack sx={{ flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
                            <ListItemText
                                primary={
                                    <Typography variant="subtitle1" fontWeight="bold" color="#fff">
                                        Descrição: {investimento.descricao || 'Sem descrição'}
                                    </Typography>
                                }
                                secondary={
                                    <>
                                        <Typography variant="body1" color="#fff">
                                            Valor: R${investimento.valor}
                                        </Typography>
                                        <Typography variant="body1" color="#ccc">
                                            Data: {dayjs.utc(investimento.dtInvestimento).format('DD/MM/YYYY')}
                                        </Typography>

                                    </>
                                }
                            />
                        </Stack>
                        <Stack sx={{ flexDirection: 'row', gap: 1 }}>
                            <Button sx={{ borderWidth: '2px' }} variant="outlined" color='error' onClick={() => handleDeleteInvestimento(investimento.idInvestimento)}><DeleteIcon /></Button>
                            <Button sx={{ borderWidth: '2px' }} variant="outlined" onClick={() => handleToogleModal(investimento)}><EditIcon /></Button>
                        </Stack>
                    </ListItem>
                ))}
                {investimentos.length === 0 && (
                    <Typography variant="body2" sx={{ p: 2 }}>
                        Nenhum investimento realizado ainda!
                    </Typography>
                )}
            </List>
        </Popover>
    );
};

export default ModalInvestimento;
