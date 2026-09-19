import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { TaskBody, SprintBody } from './Task.styles';
import TaskCard, { ToogleTaskModal, TaskCardModalEntity, TaskCardSprint } from '../../Atoms/TaskCard/TaskCard';
import Modal from '../Modal/Modal';
import { getSprints, Sprint } from '../../Utils/cruds/CrudsSprint';
import { useNavigate, useParams } from 'react-router';
import { Stack, Typography, Button, Tooltip, Badge, IconButton } from '@mui/material';
import { ArrowCircleLeftOutlined, CalendarMonth, ColorLens } from '@mui/icons-material';
import Shader from '../Shader/Shader';
import { Load } from '../../Utils/Load';
import ModalTarefas from '../Modais/ModalTarefas/ModalTarefas';
import ModalCores from '../Modais/ModalCores/ModalCores';
import ModalSprint from '../Mudal2/ModalSprint';
import ModalTarefa from '../Mudal2/ModalTarefa';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Usuario } from '../../Utils/cruds/CrudsUsuario';

interface UsuarioLogadoExtras {
  qtdTarefas?: number;
  comImpedimento?: boolean;
  permissao?: string;
  tarefasVinculadas?: unknown[];
}

interface TaskProps {
  toogleLateralBar: () => void;
  atualizarProjetos?: () => void | Promise<void>;
  usuarios?: Usuario[];
  sizeUsuarios?: number;
  pagesUsuarios?: number;
  atualizarUsuarios?: (page?: number, nome?: string | null) => Promise<unknown>;
  telaAtual: () => void;
}

const Task = ({ toogleLateralBar, atualizarProjetos, usuarios, sizeUsuarios, pagesUsuarios, atualizarUsuarios, telaAtual }: TaskProps) => {

  const { idProjeto, idEmpresa, nomeEmpresa, tituloProjeto } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [showModal, setShowModal] = useState(false);
  const [entidade, setEntidade] = useState<TaskCardModalEntity>(null);
  const [id, setId] = useState<number | string | null>(null);
  const [acao, setAcao] = useState<'task' | 'sprint' | ''>('');
  const [dtInicio, setDtInicio] = useState<string | null>(null);
  const [dtFim, setDtFim] = useState<string | null>(null);

  const { usuario } = useAuth();
  const usuarioLogado = usuario as (typeof usuario & UsuarioLogadoExtras);
  const { color1, color2, color3, animate } = useTheme();

  const [popoverSprintTarefaAnchor, setPopoverSprintTarefaAnchor] = useState<boolean | null>(false);

  const [anchorTarefa, setAnchorTarefa] = useState<HTMLElement | null>(null);
  const [anchorCores, setAnchorCores] = useState<HTMLElement | null>(null);

  const handleBadgeClickTarefa = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorTarefa(event.currentTarget);
  };

  const handleBadgeClickCores = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorCores(event.currentTarget);
  };

  const handlePopoverCloseTarefa = () => {
    setAnchorTarefa(null);
  };

  const handlePopoverCloseCores = () => {
    setAnchorCores(null);
  };

  const openPopoverTarefas = Boolean(anchorTarefa);
  const openPopoverCores = Boolean(anchorCores);

  const sprintsQuery = useQuery<Sprint[]>({
    queryKey: ['sprints', idProjeto],
    queryFn: () => getSprints(idProjeto as string),
    enabled: !!idProjeto,
  });

  const sprintsList = sprintsQuery.data || [];
  const dtLastSprint = sprintsList.length > 0 ? sprintsList[sprintsList.length - 1].dtFim : null;
  const loading = sprintsQuery.isPending;

  const atualizarSprints = async () => {
    return queryClient.invalidateQueries({ queryKey: ['sprints', idProjeto] });
  };

  const handleOpenProject = async () => {
    navigate(`/Home/${nomeEmpresa}/${idEmpresa}`)
  }

  const handleOpenDash = async () => {
    navigate(`/Home/${nomeEmpresa}/${idEmpresa}/Dash/${tituloProjeto}/${Number(idProjeto)}`)
  }

  useEffect(() => {
    toogleLateralBar();
    telaAtual();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idProjeto]);

  const toogleModal: ToogleTaskModal = (entidade, post, id, dtInicio, dtFim) => {
    setAcao(post);
    setEntidade(entidade);
    setId(id ?? null);
    setDtInicio(dtInicio ?? null);
    setDtFim(dtFim ?? null);
    // setShowModal(!showModal);
    setPopoverSprintTarefaAnchor(!popoverSprintTarefaAnchor);
  };

  if (loading) return <Load />;

  return (
    <>
      <Shader animate={animate} color1={color1} color2={color2} color3={color3} index={0} />
      <TaskBody>
        <Typography variant="h3" sx={{ display: 'flex', alignItems: 'center', fontFamily: "Bebas Neue" }}>
          <ArrowCircleLeftOutlined sx={{ cursor: 'pointer', fontSize: '45px', marginRight: 1 }} onClick={handleOpenProject} />{tituloProjeto} - Roadmap
          <Stack sx={{ position: 'fixed', right: '2%', display: 'flex', flexDirection: 'row', gap: 1.5, alignItems: 'center' }}>
            <Button variant='contained' sx={{ cursor: 'pointer' }} onClick={handleOpenDash}>Ir para Dashboard</Button>
            <Tooltip title="Tarefas abertas em seu nome.">
              <IconButton onClick={handleBadgeClickTarefa} sx={{ padding: 0 }}>
                <Badge
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '1.25rem',
                      height: '26px',
                      width: '26px',
                      cursor: 'pointer'
                    }
                  }} badgeContent={usuarioLogado?.qtdTarefas} color={usuarioLogado?.comImpedimento ? "error" : "primary"}>
                  <CalendarMonth sx={{ fontSize: 32, cursor: 'pointer' }} />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar cor de fundo.">
              <IconButton onClick={handleBadgeClickCores} sx={{ padding: 0 }}>
                <ColorLens
                  sx={{
                    height: '40px',
                    width: '40px',
                    cursor: 'pointer'
                  }} />
              </IconButton>
            </Tooltip>
          </Stack>
        </Typography>
        <SprintBody>

          {sprintsList.length > 0 && sprintsList.map((sprint, index) => (
            <TaskCard key={sprint.idSprint ?? index} toogleTaskModal={toogleModal} sprint={sprint as unknown as TaskCardSprint} index={index + 1} atualizarSprints={atualizarSprints} atualizarProjetos={atualizarProjetos} />
          ))}
          {usuarioLogado?.permissao != 'FUNC' ?
            <TaskCard toogleTaskModal={toogleModal} />
            : null}
        </SprintBody>
      </TaskBody>

      {acao == 'task' ?
        <ModalTarefa
          open={Boolean(popoverSprintTarefaAnchor)}
          onClose={() => setPopoverSprintTarefaAnchor(null)}
          task={entidade}
          toogleModal={toogleModal}
          usuarios={usuarios}
          sizeUsuarios={sizeUsuarios}
          pagesUsuarios={pagesUsuarios}
          atualizarUsuarios={atualizarUsuarios}
          idSprint={id}
          dtInicioSprint={dtInicio}
          dtFimSprint={dtFim}
          atualizarSprints={atualizarSprints}
          atualizarProjetos={atualizarProjetos}
        />
        :
        <ModalSprint
          open={Boolean(popoverSprintTarefaAnchor)}
          onClose={() => setPopoverSprintTarefaAnchor(null)}
          sprint={entidade}
          toogleModal={toogleModal}
          fkProjeto={idProjeto}
          atualizarSprints={atualizarSprints}
          atualizarProjetos={atualizarProjetos}
          dtLastSprint={dtLastSprint} />
      }

      <ModalTarefas
        tarefas={usuarioLogado?.tarefasVinculadas as never[] | undefined}
        open={openPopoverTarefas}
        anchorEl={anchorTarefa}
        onClose={handlePopoverCloseTarefa}
      />
      <ModalCores
        open={openPopoverCores}
        anchorEl={anchorCores}
        onClose={handlePopoverCloseCores}
      />
    </>
  )
}

export default Task
