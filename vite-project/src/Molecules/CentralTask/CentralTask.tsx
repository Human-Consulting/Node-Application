import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ArrowCircleLeftOutlined, CalendarMonth, ColorLens, MoreVert } from '@mui/icons-material';

import { getSprint, Sprint } from '../../Utils/cruds/CrudsSprint';
import { Task } from '../../Utils/cruds/CrudsTask';
import { BackCentral, BodyTarefa, DoneContainer } from './CentralTask.styles';
import HeaderFilter from '../../Atoms/HeaderFilter/HeaderFilter';
import TarefasItem, { TarefasItemPutPayload } from '../../Atoms/TarefasItem/TarefasItem';
import { Stack, Typography, Button, Tooltip, Badge } from '@mui/material';
import Modal from '../Modal/Modal';
import Shader from '../Shader/Shader';
import { Load } from '../../Utils/Load';
import ModalTarefas from '../Modais/ModalTarefas/ModalTarefas';
import ModalCores from '../Modais/ModalCores/ModalCores';
import ModalTarefa from '../Mudal2/ModalTarefa';
import ModalSprint from '../Mudal2/ModalSprint';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Usuario } from '../../Utils/cruds/CrudsUsuario';

interface UsuarioLogadoExtras {
  qtdTarefas?: number;
  comImpedimento?: boolean;
  permissao?: string;
  tarefasVinculadas?: unknown[];
}

interface CentralTaskSprint extends Sprint {
  tarefas?: Task[];
}

type CentralTaskEntidade = TarefasItemPutPayload | CentralTaskSprint | null;

interface CentralTaskProps {
  toogleLateralBar: () => void;
  usuarios?: Usuario[];
  sizeUsuarios?: number;
  pagesUsuarios?: number;
  atualizarUsuarios?: (page?: number, nome?: string | null) => Promise<unknown>;
  atualizarProjetos?: () => void | Promise<void>;
}

const CentralTask = ({ toogleLateralBar, usuarios, sizeUsuarios, pagesUsuarios, atualizarUsuarios, atualizarProjetos }: CentralTaskProps) => {
  const { idProjeto, idEmpresa, nomeEmpresa, tituloProjeto, tituloSprint, idSprint } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [tarefas, setTarefas] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [entidade, setEntidade] = useState<CentralTaskEntidade>(null);
  const [id, setId] = useState<number | string | null>(null);
  const [acao, setAcao] = useState<'task' | 'sprint' | ''>('');
  const [tarefasAFazerFiltradas, setTarefasAFazerFiltradas] = useState<Task[]>([]);
  const [tarefasEmDevFiltradas, setTarefasEmDevFiltradas] = useState<Task[]>([]);
  const [tarefasConcluidasFiltradas, setTarefasConcluidasFiltradas] = useState<Task[]>([]);
  const [tarefasAFazer, setTarefasAFazer] = useState<Task[]>([]);
  const [tarefasEmDev, setTarefasEmDev] = useState<Task[]>([]);
  const [tarefasConcluidas, setTarefasConcluidas] = useState<Task[]>([]);

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

  const toogleModal = (
    entidade: CentralTaskEntidade,
    post: 'task' | 'sprint',
    id: number | string | null,
    dtInicio?: string,
    dtFim?: string
  ) => {
    // dtInicio/dtFim are accepted (and passed by some callers) but not
    // stored - CentralTask reads them straight off `sprint` where needed.
    void dtInicio; void dtFim;
    setAcao(post);
    setEntidade(entidade);
    // setShowModal(!showModal);
    setPopoverSprintTarefaAnchor(!popoverSprintTarefaAnchor);
    setId(id);
  };

  const handleOpenModalPutTask = (task: TarefasItemPutPayload) => {
    toogleModal(task, 'task', null, sprint?.dtInicio, sprint?.dtFim);
  }

  const handleOpenModalPutSprint = () => {
    toogleModal(sprint, 'sprint', null);
  }

  const handleOpenModalPostTask = () => {
    toogleModal(null, 'task', sprint?.idSprint ?? null, sprint?.dtInicio, sprint?.dtFim);
  }

  const sprintQuery = useQuery<CentralTaskSprint>({
    queryKey: ['sprint', idSprint],
    queryFn: () => getSprint(idSprint as string) as Promise<CentralTaskSprint>,
    enabled: !!idSprint,
  });

  const sprint = sprintQuery.data || null;
  const loading = sprintQuery.isPending;

  const atualizarSprint = async () => {
    return queryClient.invalidateQueries({ queryKey: ['sprint', idSprint] });
  };

  useEffect(() => {
    if (sprint) {
      setTarefas(sprint.tarefas || []);
    }
  }, [sprint]);

  useEffect(() => {
    toogleLateralBar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idSprint]);

  const handleOpenProject = async () => {
    navigate(`/Home/${nomeEmpresa}/${Number(idEmpresa)}/Roadmap/${tituloProjeto}/${Number(idProjeto)}`);
  }

  useEffect(() => {
    const aFazer = tarefas.filter((t) => t.progresso === 0);
    const emDev = tarefas.filter((t) => (t.progresso ?? 0) > 0 && (t.progresso ?? 0) < 100);
    const concluidas = tarefas.filter((t) => t.progresso === 100);

    setTarefasAFazer(aFazer);
    setTarefasAFazerFiltradas(aFazer);
    setTarefasEmDev(emDev);
    setTarefasEmDevFiltradas(emDev);
    setTarefasConcluidasFiltradas(concluidas);
    setTarefasConcluidas(concluidas);
  }, [tarefas]);

  if (loading) return <Load />;

  console.log(usuarios);
  return (
    <Stack sx={{ width: '100%', height: '100%', padding: '1.5rem', gap: '1rem' }}>
      <Shader animate={animate} color1={color1} color2={color2} color3={color3} index={0} />
      <Typography variant="h3" sx={{ display: 'flex', alignItems: 'center', fontFamily: "Bebas Neue", zIndex: 2 }}>
        <ArrowCircleLeftOutlined sx={{ cursor: 'pointer', fontSize: '45px', marginRight: 1 }} onClick={handleOpenProject} /> {tituloProjeto} - {tituloSprint} - Backlog
        <Stack sx={{ position: 'fixed', right: '2%', display: 'flex', flexDirection: 'row', gap: 1.5, alignItems: 'center' }}>
          {usuarioLogado?.permissao != 'FUNC' && (<Button variant='contained' sx={{ cursor: 'pointer' }} onClick={handleOpenModalPostTask}>Criar tarefa</Button>)}
          <Tooltip title="Tarefas abertas em seu nome.">
            <Badge onClick={handleBadgeClickTarefa}
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
          </Tooltip>
          <Tooltip title="Editar cor de fundo.">
            <ColorLens onClick={handleBadgeClickCores as unknown as React.MouseEventHandler<SVGSVGElement>}
              sx={{
                height: '40px',
                width: '40px',
                cursor: 'pointer'
              }} />
          </Tooltip>
          <Tooltip title="Editar sprint">
            <MoreVert
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModalPutSprint();
              }}
              sx={{
                color: '#FFF',
                cursor: 'pointer'
              }}
            />
          </Tooltip>
        </Stack>
      </Typography>
      <BackCentral>
        <DoneContainer>
          <HeaderFilter
            titulo="A Fazer"
            todasTarefas={tarefasAFazer}
            tarefaData={tarefasAFazerFiltradas}
            setTarefasFiltradas={setTarefasAFazerFiltradas}
            usuarios={usuarios ?? []}
            idProjeto={idProjeto}
          />
          <BodyTarefa>
            {tarefasAFazerFiltradas.map((tarefa, index) => (
              <TarefasItem
                key={index}
                toogleModal={handleOpenModalPutTask}
                tarefa={tarefa}
                atualizarProjetos={atualizarProjetos}
                atualizarSprints={atualizarSprint}
              />
            ))}
          </BodyTarefa>
        </DoneContainer>

        <DoneContainer>
          <HeaderFilter
            titulo="Em Desenvolvimento"
            todasTarefas={tarefasEmDev}
            tarefaData={tarefasEmDevFiltradas}
            setTarefasFiltradas={setTarefasEmDevFiltradas}
            usuarios={usuarios ?? []}
          />
          <BodyTarefa>
            {tarefasEmDevFiltradas.map((tarefa, index) => (
              <TarefasItem
                key={index}
                toogleModal={handleOpenModalPutTask}
                tarefa={tarefa}
                atualizarProjetos={atualizarProjetos}
                atualizarSprints={atualizarSprint}
              />
            ))}
          </BodyTarefa>
        </DoneContainer>

        <DoneContainer>
          <HeaderFilter
            titulo="Concluído"
            todasTarefas={tarefasConcluidas}
            tarefaData={tarefasConcluidasFiltradas}
            setTarefasFiltradas={setTarefasConcluidasFiltradas}
            usuarios={usuarios ?? []}
          />
          <BodyTarefa>
            {tarefasConcluidasFiltradas.map((tarefa, index) => (
              <TarefasItem
                key={index}
                toogleModal={handleOpenModalPutTask}
                tarefa={tarefa}
                atualizarProjetos={atualizarProjetos}
                atualizarSprints={atualizarSprint}
              />
            ))}
          </BodyTarefa>
        </DoneContainer>
      </BackCentral>

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
          dtInicioSprint={sprint?.dtInicio}
          dtFimSprint={sprint?.dtFim}
          atualizarSprints={atualizarSprint}
          atualizarProjetos={atualizarProjetos}
        />
        :
        <ModalSprint
          open={Boolean(popoverSprintTarefaAnchor)}
          onClose={() => setPopoverSprintTarefaAnchor(null)}
          sprint={entidade}
          toogleModal={toogleModal}
          fkProjeto={idProjeto}
          atualizarSprints={atualizarSprint}
          atualizarProjetos={atualizarProjetos}
          dtLastSprint={undefined} />
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
    </Stack>
  );
};

export default CentralTask;
