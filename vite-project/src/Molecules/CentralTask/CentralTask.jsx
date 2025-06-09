
import { useNavigate, useParams } from 'react-router';
import TarefaMini from '../TarefaMini/TarefaMini';
import { BackCentral, MidleCarrousel } from './CentralTask.styles';
import { useEffect, useState } from 'react';
import { getTasks } from '../../Utils/cruds/CrudsTask';
import Modal from '../Modal/Modal';
import FormsTask from '../Forms/FormsTask';
import { ArrowCircleLeftOutlined } from '@mui/icons-material';
import { getSprints } from '../../Utils/cruds/CrudsSprint';
import { Typography, Button } from '@mui/material';
import Shader from '../Shader/Shader';

const CentralTask = ({ toogleLateralBar, usuarios, atualizarProjetos, color1, color2, color3, animate }) => {

  const { nomeEmpresa, idEmpresa, tituloProjeto, idProjeto, idSprint, index } = useParams();
  const navigate = useNavigate();
  const acaoValue = "task";

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  const handleOpenProject = () => {
    navigate(`/Home/${nomeEmpresa}/${idEmpresa}/Roadmap/${tituloProjeto}/${idProjeto}`);
  }

  const handleOpenDash = async () => {
    navigate(`/Home/${nomeEmpresa}/${idEmpresa}/Dash/${tituloProjeto}/${Number(idProjeto)}`)
  }

  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState(null);
  const [tarefas, setTarefas] = useState([]);

  const atualizarSprints = async () => {
    const sprints = await getSprints(idSprint);
    setSprints(sprints);
  };

  const atualizarTasks = async () => {
    const tarefas = await getTasks(idSprint);
    setTarefas(tarefas);
  };

  useEffect(() => {
    atualizarTasks();
    toogleLateralBar();
  }, []);

  const toogleModal = (task) => {
    setTask(task);
    setShowModal(!showModal);
  };


  return (
    <BackCentral>
      <Shader animate={animate} color1={color1} color2={color2} color3={color3} index={0} />
        <Typography variant="h3" mt={3} mb={2} sx={{ display: 'flex', alignItems: 'center', position: 'relative', fontFamily: "Bebas Neue" }}>
          <ArrowCircleLeftOutlined sx={{ cursor: 'pointer', fontSize: '45px', marginRight: 1 }} onClick={handleOpenProject} />
          {tituloProjeto} - Sprint {index}
          <Button variant='contained' sx={{ cursor: 'pointer', position: 'absolute', right: 0 }} onClick={handleOpenDash}>Ir para Dashboard</Button></Typography>
      <MidleCarrousel>
        {tarefas.map((tarefa, index) => (
          <TarefaMini idSprint={tarefa.idSprint} indice={index + 1} tarefa={tarefa} key={tarefa.index} toogleModal={toogleModal} atualizarProjetos={atualizarProjetos} atualizarTasks={atualizarTasks} />
        ))}
        {usuarioLogado.permissao != 'FUNC' ?
          <TarefaMini toogleModal={toogleModal} atualizarProjetos={atualizarProjetos} atualizarTasks={atualizarTasks} tarefa={null} />
          : null}
      </MidleCarrousel>

      <Modal showModal={showModal} fechar={toogleModal} acao={acaoValue}
        form=<FormsTask task={task} toogleModal={toogleModal} atualizarSprints={atualizarSprints} usuarios={usuarios} idSprint={idSprint} atualizarProjetos={atualizarProjetos} atualizarTasks={atualizarTasks} />
      >
      </Modal>

    </BackCentral>
  )
}

export default CentralTask
