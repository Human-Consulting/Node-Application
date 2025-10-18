
import { useNavigate, useParams } from 'react-router';
import TarefaMini from '../TarefaMini/TarefaMini';
import { BackCentral, BodyTarefa, DoneContainer, MidleCarrousel } from './CentralTask.styles';
import { useEffect, useState } from 'react';
import { getTasks } from '../../Utils/cruds/CrudsTask';
import Modal from '../Modal/Modal';
import FormsTask from '../Forms/FormsTask';
import { ArrowCircleLeftOutlined } from '@mui/icons-material';
import { getSprints } from '../../Utils/cruds/CrudsSprint';
import { Typography, Button } from '@mui/material';
import Shader from '../Shader/Shader';
import HeaderFilter from '../../Atoms/HeaderFilter/HeaderFilter';
import TarefasItem from '../../Atoms/TarefasItem/TarefasItem';

const CentralTask = ({ toogleLateralBar, usuarios, atualizarProjetos, color1, color2, color3, animate }) => {

  const { nomeEmpresa, idEmpresa, tituloProjeto, idProjeto, idSprint, index } = useParams();

  console.log(idSprint, 111)
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
  const [tarefasFiltradas, setTarefasFiltradas] = useState([]);


  const atualizarSprints = async () => {
    const sprints = await getSprints(idSprint);
    setSprints(sprints);
  };

  const atualizarTasks = async () => {
    const tarefas = await getTasks(idSprint);
    setTarefas(tarefas);
  console.log(tarefas)

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
      <DoneContainer><HeaderFilter setTarefasFiltradas={setTarefasFiltradas} tarefaData={tarefas} titulo='A fazer'/> 
        <BodyTarefa>
            {tarefasFiltradas.map((tarefa, index) => (
              <TarefasItem key={index} tarefa={tarefa}  atualizarProjetos={atualizarProjetos} atualizarSprints={atualizarSprints} ></TarefasItem>
            ))}
          </BodyTarefa></DoneContainer>
      <DoneContainer><HeaderFilter setTarefasFiltradas={setTarefas} tarefaData={tarefas} titulo='Em desenvolvimento'/></DoneContainer>
      <DoneContainer><HeaderFilter setTarefasFiltradas={setTarefas} tarefaData={tarefas} titulo='Concluido'/></DoneContainer>
    </BackCentral>
  )
}

export default CentralTask 
