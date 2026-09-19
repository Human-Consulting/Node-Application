import { useState } from "react";
import { Popover, List, ListItem, ListItemText, LinearProgress, Typography, Box, Stack, Grid, IconButton } from '@mui/material';
import { CheckCircleOutline, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import { Task } from "../../../Utils/cruds/CrudsTask";

// `tarefas` comes from `usuarioLogado.tarefasVinculadas`, which the backend
// enriches with the sprint/projeto/empresa chain needed for navigation below
// - none of that nesting is part of the flat `Task` crud type, so it's
// declared locally as an extension of it.
interface TarefaVinculadaSprint {
    titulo?: string;
    idSprint?: number | string;
    projeto?: {
        titulo?: string;
        idProjeto?: number | string;
        empresa?: {
            nome?: string;
            idEmpresa?: number | string;
        };
    };
}

export interface TarefaVinculada extends Task {
    sprint: TarefaVinculadaSprint;
}

interface ModalTarefasProps {
    tarefas?: TarefaVinculada[];
    open: boolean;
    // PrincipalContainer.tsx tracks its anchor as the broader `Element`
    // (from a generic MouseEvent<Element>), while the other callers
    // (CentralTask/Dashboard/Task) use `HTMLElement` - `Element` covers both.
    anchorEl: Element | null;
    onClose: () => void;
}

const ModalTarefas = ({ tarefas = [], open, anchorEl, onClose }: ModalTarefasProps) => {
    const navigate = useNavigate();

    const id = open ? 'tarefas-popover' : undefined;

    const [mesAtual, setMesAtual] = useState(dayjs().month());
    const [anoAtual, setAnoAtual] = useState(dayjs().year());
    const [diaSelecionado, setDiaSelecionado] = useState<number | null>(null);

    const diasNoMes = dayjs(`${anoAtual}-${mesAtual + 1}-01`).daysInMonth();
    const primeiroDiaSemana = dayjs(`${anoAtual}-${mesAtual + 1}-01`).day();
    const dias = Array.from({ length: diasNoMes }, (_, i) => i + 1);

    const handleMesChange = (delta: number) => {
        const novoMes = mesAtual + delta;
        if (novoMes < 0) {
            setMesAtual(11);
            setAnoAtual(anoAtual - 1);
        } else if (novoMes > 11) {
            setMesAtual(0);
            setAnoAtual(anoAtual + 1);
        } else {
            setMesAtual(novoMes);
        }
        setDiaSelecionado(null);
    };

    const handleDiaClick = (dia: number) => {
        setDiaSelecionado(dia === diaSelecionado ? null : dia);
    };

    const getCorDia = (dia: number) => {
        const data = dayjs(`${anoAtual}-${mesAtual + 1}-${dia}`);
        const tarefasDoDia = tarefas?.filter(t => dayjs(t.dtFim).isSame(data, "day"));
        const temImpedimento = tarefasDoDia?.some(t => t.comImpedimento);

        if (!temImpedimento) {
            if (tarefasDoDia.length === 0) return "#1a1a1a";
            return "#007bff";
        }

        return "#d32f2f";
    };

    const tarefasFiltradas = diaSelecionado
        ? tarefas.filter(t =>
            dayjs(t.dtFim).date() === diaSelecionado &&
            dayjs(t.dtFim).month() === mesAtual &&
            (t.progresso ?? 0) < 100
        )
        : tarefas.filter(t => (t.progresso ?? 0) < 100);


    const handleOpenProject = (tarefa: TarefaVinculada, index: number) => {
        const nomeEmpresa = tarefa.sprint.projeto?.empresa?.nome;
        const idEmpresa = tarefa.sprint.projeto?.empresa?.idEmpresa;
        const descricaoProjeto = tarefa.sprint.projeto?.titulo;
        const idProjeto = tarefa.sprint.projeto?.idProjeto;
        const sprintTitulo = tarefa.sprint.titulo;
        const idSprint = tarefa.sprint.idSprint;

        onClose();

        navigate(
            `/Home/${nomeEmpresa}/${Number(idEmpresa)}/Roadmap/${descricaoProjeto}/${idProjeto}/Backlog/${sprintTitulo}/${idSprint}/${index}`
        );
    };

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
                sx: {
                    width: 750,
                    maxHeight: 350,
                    overflow: "hidden",
                    overflowY: "auto",
                    background: "background.default",
                    borderRadius: "16px",
                    display: "flex",
                    flexDirection: "row"
                }
            }}
        >
            <Box sx={{ p: 2, borderRight: "1px solid", borderColor: "divider", width: "45%", display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
                    <IconButton onClick={() => handleMesChange(-1)}><ArrowBackIos sx={{ color: "text.primary", fontSize: 16 }} /></IconButton>
                    <Typography color="text.primary" fontWeight="bold">
                        {dayjs(`${anoAtual}-${mesAtual + 1}-01`).format("MMMM YYYY")}
                    </Typography>
                    <IconButton onClick={() => handleMesChange(1)}><ArrowForwardIos sx={{ color: "text.primary", fontSize: 16 }} /></IconButton>
                </Box>

                <Grid container spacing={0.5}>
                    {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
                        <Grid item xs={1.7} key={i}>
                            <Typography align="center" sx={{ color: "text.secondary", fontSize: 13 }}>{d}</Typography>
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={0.5} mt={0.5}>
                    {Array.from({ length: primeiroDiaSemana }).map((_, i) => (
                        <Grid item xs={1.7} key={`vazio-${i}`} />
                    ))}

                    {dias.map((dia) => (
                        <Grid item xs={1.7} key={dia}>
                            <Box
                                onClick={() => handleDiaClick(dia)}
                                sx={{
                                    height: 28,
                                    width: 28,
                                    margin: "auto",
                                    borderRadius: "50%",
                                    background: getCorDia(dia),
                                    color: "white",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    fontSize: 13,
                                    transform: diaSelecionado === dia ? "scale(1.1)" : "scale(1)",
                                    transition: "0.2s ease",
                                    boxShadow: diaSelecionado === dia ? "0 0 6px #fff" : "none"
                                }}
                            >
                                {dia}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <List sx={{
                flex: 1,
                overflowY: "auto",
                p: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                "&::-webkit-scrollbar": { width: "8px" },
                "&::-webkit-scrollbar-track": { background: "transparent" },
                "&::-webkit-scrollbar-thumb": { background: "#888", borderRadius: "4px" },
                "&::-webkit-scrollbar-thumb:hover": { background: "#aaa" },
            }}>
                {tarefasFiltradas.length > 0 ? (
                    tarefasFiltradas.map((tarefa, index) => (
                        <ListItem
                            key={index}
                            onClick={() => handleOpenProject(tarefa, index)}
                            sx={{
                                flexDirection: 'column',
                                alignItems: 'flex-start',
                                background: 'background.paper',
                                paddingBlock: '0.8rem',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                transition: '0.2s',
                                "&:hover": { background: '#181818' }
                            }}>
                            <ListItemText
                                primary={<Typography fontWeight="bold" color="text.primary">{tarefa.sprint.projeto?.titulo} - {tarefa.titulo}</Typography>}
                                secondary={
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            Prazo: {dayjs(tarefa.dtFim).format("DD/MM/YYYY")}
                                        </Typography>
                                        {tarefa.comImpedimento && (
                                            <Typography variant="body2" color="#f44336">Com Impedimento</Typography>
                                        )}
                                    </Box>
                                }
                            />
                            <Box display="flex" alignItems="center" width="100%" gap={1}>
                                <Box sx={{ flex: 1, border: 'none' }}>
                                    <LinearProgress
                                        variant="determinate"
                                        value={tarefa.progresso || 0}
                                        sx={{
                                            border: 'none',
                                            height: 8,
                                            borderRadius: 5,
                                            backgroundColor: tarefa.comImpedimento ? "#f8d7da" : "#e0e0e0",
                                            "& .MuiLinearProgress-bar": {
                                                border: 'none',
                                                backgroundColor: tarefa.comImpedimento ? "#d32f2f" : "#1976d2",
                                            },
                                        }}
                                    />
                                </Box>
                                <Typography variant="body2" color="text.primary">
                                    {`${tarefa.progresso || 0}%`}
                                </Typography>
                            </Box>
                        </ListItem>
                    ))
                ) : (
                    <Stack alignItems="center" justifyContent="center" sx={{ height: '100%', p: 2, color: "#90caf9" }}>
                        <CheckCircleOutline sx={{ fontSize: 40, mb: 1, border: 'solid #1976d2 3px', borderRadius: '50%' }} />
                        <Typography variant="body2">Nenhuma tarefa pendente!</Typography>
                    </Stack>
                )}
            </List>
        </Popover>
    );
};

export default ModalTarefas;
