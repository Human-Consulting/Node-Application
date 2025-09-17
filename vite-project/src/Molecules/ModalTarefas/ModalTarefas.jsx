import { Popover, List, ListItem, ListItemText, LinearProgress, Typography, Box, Stack } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material'

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
            <List sx={{
                width: 300, maxHeight: 350, background: '#000', padding: 1, display: 'flex', flexDirection: 'column', gap: 1.5,
                overflowY: "auto", // 👈 garante que a barra aparece
                "&::-webkit-scrollbar": {
                    width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                    background: "#1a1a1a",
                    borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb": {
                    background: "#888",
                    borderRadius: "4px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                    background: "#aaa",
                },
            }}>
                {tarefas.filter(tarefa => tarefa.progresso < 100).map((tarefa, index) => (
                    <ListItem key={index} alignItems="flex-start" sx={{ flexDirection: 'column', alignItems: 'flex-start', background: '#1D1D1D', paddingBlock: '1rem', borderRadius: '16px' }}>
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
                    <Stack alignItems="center" justifyContent="center" sx={{ p: 2, color: "#90caf9" }}>
                        <CheckCircleOutline sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="body2">
                            Tudo concluído!
                        </Typography>
                    </Stack>
                )}
            </List>
        </Popover>
    );
};

export default ModalTarefas;
