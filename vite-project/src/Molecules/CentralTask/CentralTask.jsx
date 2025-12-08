import { useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { ArrowCircleLeftOutlined, CalendarMonth, ColorLens, MoreVert } from '@mui/icons-material';

import { getSprint } from '../../Utils/cruds/CrudsSprint';
import { BackCentral, BodyTarefa, DoneContainer } from './CentralTask.styles';
import HeaderFilter from '../../Atoms/HeaderFilter/HeaderFilter';
import TarefasItem from '../../Atoms/TarefasItem/TarefasItem';
import { Stack, Typography, Button, Tooltip, Badge } from '@mui/material';
import Modal from '../Modal/Modal';
import FormsTask from '../Modal/Forms/FormsTask';
import FormsSprint from '../Modal/Forms/FormsSprint';
import Shader from '../Shader/Shader';
import { Load } from '../../Utils/Load';
import ModalTarefas from '../Modais/ModalTarefas/ModalTarefas';
import ModalCores from '../Modais/ModalCores/ModalCores';

const CentralTask = ({ 
  toogleLateralBar, usuarios, sizeUsuarios, pagesUsuarios, atualizarUsuarios, 
  atualizarProjetos, color1, color2, color3, setColor1, setColor2, setColor3, 
  animate, setAnimate 
}) => {

  const { idProjeto, idEmpresa, nomeEmpresa, tituloProjeto, tituloSprint, idSprint } = useParams();
  const navigate = useNavigate();

  const [sprint, setSprint] = useState(null);
  const [tarefas, setTarefas] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [entidade, setEntidade] = useState(null);
  const [id, setId] = useState(null);
  const [acao, setAcao] = useState('');

  const [tarefasAFazerFiltradas, setTarefasAFazerFiltradas] = useState([]);
  const [tarefasEmDevFiltradas, setTarefasEmDevFiltradas] = useState([]);
  const [tarefasConcluidasFiltradas, setTarefasConcluidasFiltradas] = useState([]);

  const [tarefasAFazer, setTarefasAFazer] = useState([]);
  const [tarefasEmDev, setTarefasEmDev] = useState([]);
  const [tarefasConcluidas, setTarefasConcluidas] = useState([]);

  const [loading, setLoading] = useState(true);

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  const [anchorTarefa, setAnchorTarefa] = useState(null);
  const [anchorCores, setAnchorCores] = useState(null);

  const handleBadgeClickTarefa = (event) => setAnchorTarefa(event.currentTarget);
  const handleBadgeClickCores = (event) => setAnchorCores(event.currentTarget);

  const handlePopoverCloseTarefa = () => setAnchorTarefa(null);
  const handlePopoverCloseCores = () => setAnchorCores(null);

  const openPopoverTarefas = Boolean(anchorTarefa);
  const openPopoverCores = Boolean(anchorCores);

  const toogleModal = (entidade, post, id) => {
    setAcao(post);
    setEntidade(entidade);
    setShowModal(!showModal);
    setId(id);
  };

  const handleOpenModalPutTask = (task) => {
    toogleModal(task, 'task', null, sprint.dtInicio, sprint.dtFim);
  };

  const handleOpenModalPutSprint = () => {
    toogleModal(sprint, 'sprint', null);
  };

  const handleOpenModalPostTask = () => {
    toogleModal(null, 'task', sprint.idSprint, sprint.dtInicio, sprint.dtFim);
  };

  const atualizarSprint = async () => {
    setLoading(true);
    const sprintRetornada = await getSprint(idSprint);
    setSprint(sprintRetornada);
    setLoading(false);
  };

  useEffect(() => {
    if (sprint) {
      setTarefas(sprint.tarefas || []);
    }
  }, [sprint]);

  useEffect(() => {
    atualizarSprint();
    toogleLateralBar();
  }, [idSprint]);

  const handleOpenProject = () => {
    navigate(`/Home/${nomeEmpresa}/${Number(idEmpresa)}/Roadmap/${tituloProjeto}/${Number(idProjeto)}`);
  };

  useEffect(() => {
    const aFazer = tarefas.filter((t) => t.progresso === 0);
    const emDev = tarefas.filter((t) => t.progresso > 0 && t.progresso < 100);
    const concluidas = tarefas.filter((t) => t.progresso === 100);

    setTarefasAFazer(aFazer);
    setTarefasAFazerFiltradas(aFazer);
    setTarefasEmDev(emDev);
    setTarefasEmDevFiltradas(emDev);
    setTarefasConcluidas(concluidas);
    setTarefasConcluidasFiltradas(concluidas);
  }, [tarefas]);

  if (loading) {
    return <Load animate={animate} color1={color1} color2={color2} color3={color3} index={0} />;
  }

  console.log(usuarios);
  return (
    <Stack sx={{ width: '100%', height: '100%', padding: '1.5rem', gap: '1rem' }}>
      <Shader animate={animate} color1={color1} color2={color2} color3={color3} index={0} />

      <Typography variant="h3" sx={{ display: 'flex', alignItems: 'center', fontFamily: 'Bebas Neue' }}>
        <ArrowCircleLeftOutlined 
          sx={{ cursor: 'pointer', fontSize: '45px', marginRight: 1 }} 
          onClick={handleOpenProject} 
        /> 
        {tituloProjeto} - {tituloSprint} - Backlog

        <Stack sx={{ position: 'fixed', right: '2%', display: 'flex', flexDirection: 'row', gap: 1.5, alignItems: 'center' }}>

          {usuarioLogado.permissao !== 'FUNC' && (
            <Button variant='contained' sx={{ cursor: 'pointer' }} onClick={handleOpenModalPostTask}>
              Criar tarefa
            </Button>
          )}

          <Tooltip title="Tarefas abertas em seu nome.">
            <Badge
              onClick={handleBadgeClickTarefa}
              sx={{ '& .MuiBadge-badge': { fontSize: '1.25rem', height: '26px', width: '26px', cursor: 'pointer' } }}
              badgeContent={usuarioLogado.qtdTarefas}
              color={usuarioLogado.comImpedimento ? 'error' : 'primary'}
            >
              <CalendarMonth sx={{ fontSize: 32, cursor: 'pointer' }} />
            </Badge>
          </Tooltip>

          <Tooltip title="Editar cor de fundo.">
            <ColorLens sx={{ height: '40px', width: '40px', cursor: 'pointer' }} onClick={handleBadgeClickCores} />
          </Tooltip>

          <Tooltip title="Editar sprint">
            <MoreVert
              onClick={(e) => { e.stopPropagation(); handleOpenModalPutSprint(); }}
              sx={{ cursor: 'pointer' }}
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
            usuarios={usuarios}
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
            titulo="Desenvolvendo"
            todasTarefas={tarefasEmDev}
            tarefaData={tarefasEmDevFiltradas}
            setTarefasFiltradas={setTarefasEmDevFiltradas}
            usuarios={usuarios}
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
            usuarios={usuarios}
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

      <Modal 
        showModal={showModal} 
        fechar={toogleModal} 
        acao={acao === 'task' ? 'aumentar' : null} 
        entidade={entidade}
        form={
          acao === 'task'
            ? <FormsTask 
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
            : <FormsSprint 
                sprint={entidade} 
                toogleModal={toogleModal} 
                fkProjeto={idProjeto}
                atualizarSprints={atualizarSprint}
                atualizarProjetos={atualizarProjetos}
                acao={null}
              />
        }
      />

      <ModalTarefas
        tarefas={usuarioLogado.tarefasVinculadas}
        open={openPopoverTarefas}
        anchorEl={anchorTarefa}
        onClose={handlePopoverCloseTarefa}
      />

      <ModalCores
        color1={color1} setColor1={setColor1}
        color2={color2} setColor2={setColor2}
        color3={color3} setColor3={setColor3}
        animate={animate} setAnimate={setAnimate}
        open={openPopoverCores}
        anchorEl={anchorCores}
        onClose={handlePopoverCloseCores}
      />
    </Stack>
  );
};

export default CentralTask;
