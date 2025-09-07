import { Popover, List, ListItem, ListItemText, LinearProgress, Typography, Box, Tooltip, Stack } from '@mui/material';
import { getNome, getTempoRestante } from '../../Utils/getInfos';

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
                horizontal: 'right'
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
        >
            <List sx={{ width: 300, maxHeight: 300, background: '#000' }}>
                {tarefas.filter(tarefa => tarefa.progresso < 100).map((tarefa, index) => (
                    <ListItem key={index} alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'flex-start', background: '#000', borderBlock: 'solid #1D1D1D 2px', paddingBlock: '1rem' }}>
                        <ListItemText
                            primary={
                                <Typography variant="subtitle1" fontWeight="bold" color={'text.paper'}>
                                    {tarefa.titulo}
                                </Typography>
                            }
                            secondary={
                                <Box>
                                    <Typography variant="body2" color="#ccc">
                                        Prazo: {new Date(tarefa.dtFim).toLocaleDateString()}
                                    </Typography>
                                    <Typography variant="body2" color="#ccc">
                                        {tarefa.comImpedimento ? "Com Impedimento" : ""}
                                    </Typography>
                                </Box>
                            }
                        />
                        <Box display="flex" alignItems="center" width="100%" gap={1}>
                            <Box flex={1}>
                                <LinearProgress
                                    variant="determinate"
                                    value={tarefa.progresso || 0}
                                    sx={{
                                        height: 8,
                                        borderRadius: 5,
                                        backgroundColor: tarefa.comImpedimento ? "#f8d7da" : "#e0e0e0",
                                        "& .MuiLinearProgress-bar": {
                                            backgroundColor: tarefa.comImpedimento ? "#d32f2f" : "#1976d2",
                                        },
                                    }}
                                />
                            </Box>
                            <Typography variant="body2" color="white">
                                {`${tarefa.progresso || 0}%`}
                            </Typography>
                        </Box>
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
