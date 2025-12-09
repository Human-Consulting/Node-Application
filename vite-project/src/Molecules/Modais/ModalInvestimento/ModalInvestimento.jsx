import { Popover, List, ListItem, ListItemText, Typography, Button, Stack } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { deleteInvestimento } from '../../../Utils/cruds/CrudsInvestimento.jsx';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const ModalInvestimento = ({ investimentos, open, anchorEl, onClose, toogleModal, atualizarEntidade }) => {
    const id = open ? 'investimentos-popover' : undefined;
    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

    const handleDeleteInvestimento = async (idInvestimento) => {
        onClose();
        const bodyDelete = {
            idEditor: usuarioLogado.idUsuario,
            permissaoEditor: usuarioLogado.permissao
        };
        await deleteInvestimento(idInvestimento, bodyDelete);
        await atualizarEntidade();
    };

    const handleToogleModal = (investimento) => {
        onClose();
        toogleModal(investimento);
    };

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
            PaperProps={{
                sx: {
                    backgroundColor: (theme) => theme.palette.background.paper,
                    borderRadius: 2
                }
            }}
        >
            <List
                sx={{
                    width: 450,
                    height: 450,
                    backgroundColor: (theme) => theme.palette.background.default,
                    padding: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                }}
            >

                {usuarioLogado.permissao !== 'FUNC' && (
                    <ListItem sx={{ justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleToogleModal(null)}
                        >
                            Adicionar investimento
                        </Button>
                    </ListItem>
                )}

                {investimentos.map((investimento, index) => (
                    <ListItem
                        key={index}
                        sx={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: (theme) => theme.palette.background.paper,
                            borderRadius: 2,
                            transition: '0.2s',
                            "&:hover": {
                                backgroundColor: (theme) => theme.palette.action.hover,
                            }
                        }}
                    >
                        <Stack sx={{ flexDirection: 'column', width: '100%' }}>
                            <ListItemText
                                primary={
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {investimento.descricao || 'Sem descrição'}
                                    </Typography>
                                }
                                secondary={
                                    <>
                                        <Typography variant="body1">
                                            Valor: R${investimento.valor}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Data: {dayjs.utc(investimento.dtInvestimento).format('DD/MM/YYYY')}
                                        </Typography>
                                    </>
                                }
                            />
                        </Stack>

                        <Stack direction="row" gap={1}>
                            <Button variant="outlined" color="error" onClick={() => handleDeleteInvestimento(investimento.idInvestimento)}>
                                <Delete />
                            </Button>
                            <Button variant="outlined" onClick={() => handleToogleModal(investimento)}>
                                <Edit />
                            </Button>
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
