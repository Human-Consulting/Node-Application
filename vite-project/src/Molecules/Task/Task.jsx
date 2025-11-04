import { useEffect, useState } from 'react';
import { TaskBody, SprintBody } from './Task.styles';
import TaskCard from '../../Atoms/TaskCard/TaskCard';
import Modal from '../Modal/Modal';
import FormsTask from '../Modal/Forms/FormsTask';
import { getSprints } from '../../Utils/cruds/CrudsSprint';
import { useNavigate, useParams } from 'react-router';
import FormsSprint from '../Modal/Forms/FormsSprint';
import { Stack, Typography, Button, Tooltip, Badge } from '@mui/material';
import { ArrowCircleLeftOutlined, CalendarMonth, ColorLens } from '@mui/icons-material';
import Shader from '../Shader/Shader';
import { Load } from '../../Utils/Load';
import ModalTarefas from '../Modais/ModalTarefas/ModalTarefas';
import ModalCores from '../Modais/ModalCores/ModalCores';

const Task = ({ toogleLateralBar, atualizarProjetos, usuarios, sizeUsuarios, pagesUsuarios, atualizarUsuarios, color1, color2, color3, setColor1, setColor2, setColor3, animate, setAnimate, telaAtual }) => {

  const { idProjeto, idEmpresa, nomeEmpresa, tituloProjeto } = useParams();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [entidade, setEntidade] = useState(null);
  const [id, setId] = useState(null);
  const [acao, setAcao] = useState('');
  const [loading, setLoading] = useState(true);
  const [sprintsList, setSprintsList] = useState([]);
  const [dtInicio, setDtInicio] = useState(null);
  const [dtFim, setDtFim] = useState(null);

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  const [anchorTarefa, setAnchorTarefa] = useState(null);
  const [anchorCores, setAnchorCores] = useState(null);

  const handleBadgeClickTarefa = (event) => {
    setAnchorTarefa(event.currentTarget);
  };

  const handleBadgeClickCores = (event) => {
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

  const atualizarSprints = async () => {
    setLoading(true);
    const sprints = await getSprints(idProjeto);
    setSprintsList(sprints);
    setLoading(false);
  };

  const handleOpenProject = async () => {
    navigate(`/Home/${nomeEmpresa}/${idEmpresa}`)
  }

  const handleOpenDash = async () => {
    navigate(`/Home/${nomeEmpresa}/${idEmpresa}/Dash/${tituloProjeto}/${Number(idProjeto)}`)
  }

  useEffect(() => {
    atualizarSprints();
    toogleLateralBar();
    telaAtual();
  }, [idProjeto]);

  const toogleModal = (entidade, post, id, dtInicio, dtFim) => {
    setAcao(post);
    setEntidade(entidade);
    setShowModal(!showModal);
    setId(id);
    setDtInicio(dtInicio);
    setDtFim(dtFim);
  };

  if (loading) return <Load animate={animate} color1={color1} color2={color2} color3={color3} index={0} />;

  return (
    <>
      <Shader animate={animate} color1={color1} color2={color2} color3={color3} index={0} />
      <TaskBody>
          <Typography variant="h3" sx={{ display: 'flex', alignItems: 'center', fontFamily: "Bebas Neue" }}>
            <ArrowCircleLeftOutlined sx={{ cursor: 'pointer', fontSize: '45px', marginRight: 1 }} onClick={handleOpenProject} />{tituloProjeto} - Roadmap
            <Stack sx={{ position: 'fixed', right: '2%', display: 'flex', flexDirection: 'row', gap: 1.5, alignItems: 'center' }}>
              <Button variant='contained' sx={{ cursor: 'pointer' }} onClick={handleOpenDash}>Ir para Dashboard</Button>
              <Tooltip title="Tarefas abertas em seu nome.">
                <Badge onClick={handleBadgeClickTarefa}
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '1.25rem',
                      height: '26px',
                      width: '26px',
                      cursor: 'pointer'
                    }
                  }} badgeContent={usuarioLogado.qtdTarefas} color={usuarioLogado.comImpedimento ? "error" : "primary"}>
                  <CalendarMonth sx={{ fontSize: 32, cursor: 'pointer' }} />
                </Badge>
              </Tooltip>
              <Tooltip title="Editar cor de fundo.">
                <ColorLens onClick={handleBadgeClickCores}
                  sx={{
                    height: '40px',
                    width: '40px',
                    cursor: 'pointer'
                  }} />
              </Tooltip>
            </Stack>
          </Typography>
        <SprintBody>

          {sprintsList.length > 0 && sprintsList.map((sprint, index) => (
            <TaskCard toogleTaskModal={toogleModal} sprint={sprint} index={index + 1} atualizarSprints={atualizarSprints} atualizarProjetos={atualizarProjetos} idEmpresa={idEmpresa} />
          ))}
          {usuarioLogado.permissao != 'FUNC' ?
            <TaskCard toogleTaskModal={toogleModal} />
            : null}
        </SprintBody>
      </TaskBody>

      <Modal showModal={showModal} fechar={toogleModal} acao={acao == "task" ? "aumentar" : null} entidade={entidade}
        form={acao == 'task' ? <FormsTask task={entidade} toogleModal={toogleModal} usuarios={usuarios} sizeUsuarios={sizeUsuarios} pagesUsuarios={pagesUsuarios} atualizarUsuarios={atualizarUsuarios} idSprint={id} dtInicioSprint={dtInicio} dtFimSprint={dtFim} atualizarSprints={atualizarSprints} atualizarProjetos={atualizarProjetos} />
          : <FormsSprint sprint={entidade} toogleModal={toogleModal} fkProjeto={idProjeto} atualizarSprints={atualizarSprints} atualizarProjetos={atualizarProjetos} acao={null} />}
      >
      </Modal>
      <ModalTarefas
        tarefas={usuarioLogado.tarefasVinculadas}
        open={openPopoverTarefas}
        anchorEl={anchorTarefa}
        onClose={handlePopoverCloseTarefa}
      />
      <ModalCores
        color1={color1}
        setColor1={setColor1}
        color2={color2}
        setColor2={setColor2}
        color3={color3}
        setColor3={setColor3}
        animate={animate}
        setAnimate={setAnimate}
        open={openPopoverCores}
        anchorEl={anchorCores}
        onClose={handlePopoverCloseCores}
      />
    </>
  )
}

export default Task
