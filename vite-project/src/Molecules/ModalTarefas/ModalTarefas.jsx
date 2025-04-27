import { Popover, List, ListItem, ListItemText, LinearProgress, Typography } from '@mui/material';

const ModalTarefas = ({ tarefas, open, anchorEl, onClose }) => {
    const id = open ? 'tarefas-popover' : undefined;

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <List sx={{ width: 300, maxHeight: 300, background: '#000' }}>
                {tarefas.map((tarefa, index) => (
                    <ListItem key={index} alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'flex-start', background: '#000' }}>
                        <ListItemText
                            primary={
                                <Typography variant="subtitle1" fontWeight="bold" color={'text.paper'}>
                                    {tarefa.descricao}
                                </Typography>
                            }
                            secondary={
                                <Typography variant="body2" color="#ccc">
                                    Prazo: {new Date(tarefa.dtFim).toLocaleDateString()}
                                </Typography>
                            }
                        />
                        <LinearProgress
                            variant="determinate"
                            value={tarefa.progresso || 0}
                            sx={{
                                width: '100%',
                                height: 8,
                                borderRadius: 5,
                                mt: 1,
                                backgroundColor: tarefa.comImpedimento ? '#f8d7da' : '#e0e0e0',
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: tarefa.comImpedimento ? '#d32f2f' : '#1976d2',
                                },
                            }}
                        />
                    </ListItem>
                ))}
                {tarefas.length === 0 && (
                    <Typography variant="body2" sx={{ p: 2 }}>
                        Nenhuma tarefa pendente! 🎉
                    </Typography>
                )}
            </List>
        </Popover>
    );
};

export default ModalTarefas;
