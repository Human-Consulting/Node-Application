import { useState } from "react";
import {
  Popover,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Typography,
  Box,
  Stack,
  Grid,
  IconButton
} from '@mui/material';
import {
  CheckCircleOutline,
  ArrowBackIos,
  ArrowForwardIos
} from '@mui/icons-material';
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import { useTheme } from "@mui/material/styles";

const ModalTarefas = ({ tarefas = [], open, anchorEl, onClose }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const id = open ? 'tarefas-popover' : undefined;

  const [mesAtual, setMesAtual] = useState(dayjs().month());
  const [anoAtual, setAnoAtual] = useState(dayjs().year());
  const [diaSelecionado, setDiaSelecionado] = useState(null);

  const diasNoMes = dayjs(`${anoAtual}-${mesAtual + 1}-01`).daysInMonth();
  const primeiroDiaSemana = dayjs(`${anoAtual}-${mesAtual + 1}-01`).day();
  const dias = Array.from({ length: diasNoMes }, (_, i) => i + 1);

  const handleMesChange = (delta) => {
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

  const handleDiaClick = (dia) => {
    setDiaSelecionado(dia === diaSelecionado ? null : dia);
  };

  // 🔒 CALENDÁRIO COM CORES FIXAS (NÃO USA TEMA)
  const getCorDia = (dia) => {
    const data = dayjs(`${anoAtual}-${mesAtual + 1}-${dia}`);
    const tarefasDoDia = tarefas?.filter(t =>
      dayjs(t.dtFim).isSame(data, "day")
    );

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
        t.progresso < 100
      )
    : tarefas.filter(t => t.progresso < 100);

  const handleOpenProject = (tarefa, index) => {
    const nomeEmpresa = tarefa.sprint.projeto.empresa.nome;
    const idEmpresa = tarefa.sprint.projeto.empresa.idEmpresa;
    const descricaoProjeto = tarefa.sprint.projeto.titulo;
    const idProjeto = tarefa.sprint.projeto.idProjeto;
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
          overflowY: "auto",
          background: theme.palette.background.paper,
          borderRadius: "16px",
          display: "flex",
          flexDirection: "row",
          border: `1px solid ${theme.palette.borderPrimary}`
        }
      }}
    >
      <Box sx={{ p: 2, borderRight: "1px solid #222", width: "45%" }}>
        <Box display="flex" justifyContent="space-between">
          <IconButton onClick={() => handleMesChange(-1)}>
            <ArrowBackIos sx={{ color: "#fff", fontSize: 16 }} />
          </IconButton>

          <Typography color="#fff" fontWeight="bold">
            {dayjs(`${anoAtual}-${mesAtual + 1}-01`).format("MMMM YYYY")}
          </Typography>

          <IconButton onClick={() => handleMesChange(1)}>
            <ArrowForwardIos sx={{ color: "#fff", fontSize: 16 }} />
          </IconButton>
        </Box>

        <Grid container spacing={0.5} mt={1}>
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
                  fontSize: 13
                }}
              >
                {dia}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <List sx={{ flex: 1, p: 1 }}>
        {tarefasFiltradas.length > 0 ? (
          tarefasFiltradas.map((tarefa, index) => (
            <ListItem
              key={index}
              onClick={() => handleOpenProject(tarefa, index)}
              sx={{
                background: theme.palette.background.cardBg,
                borderRadius: "12px",
                mb: 1,
                cursor: "pointer",
                border: `1px solid ${theme.palette.borderPrimary}`,
                "&:hover": {
                  background: theme.palette.background.paper
                }
              }}
            >
              <ListItemText
                primary={
                  <Typography fontWeight="bold">
                    {tarefa.sprint.projeto.titulo} - {tarefa.titulo}
                  </Typography>
                }
                secondary={
                  <Typography color="text.secondary">
                    Prazo: {dayjs(tarefa.dtFim).format("DD/MM/YYYY")}
                  </Typography>
                }
              />

              <LinearProgress
                variant="determinate"
                value={tarefa.progresso || 0}
                sx={{
                  height: 8,
                  borderRadius: 5,
                  backgroundColor: theme.palette.borderPrimary,
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: tarefa.comImpedimento
                      ? theme.palette.error.main
                      : theme.palette.primary.main
                  }
                }}
              />
            </ListItem>
          ))
        ) : (
          <Stack alignItems="center" justifyContent="center" sx={{ height: "100%" }}>
            <CheckCircleOutline
              sx={{
                fontSize: 40,
                mb: 1,
                border: `3px solid ${theme.palette.primary.main}`,
                borderRadius: "50%"
              }}
            />
            <Typography>Nenhuma tarefa pendente!</Typography>
          </Stack>
        )}
      </List>
    </Popover>
  );
};

export default ModalTarefas;
