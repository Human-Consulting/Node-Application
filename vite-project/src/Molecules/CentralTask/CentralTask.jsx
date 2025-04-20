
import { useNavigate, useParams } from 'react-router';
import TarefaMini from '../TarefaMini/TarefaMini';
import { BackCentral, MidleCarrousel, TituloHeader } from './CentralTask.styles';
import { useEffect, useState } from 'react';
import { getTasks } from '../../Utils/cruds/CrudsTask';
import Modal from '../Modal/Modal';
import FormsTask from '../Forms/FormsTask';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { getSprints } from '../../Utils/cruds/CrudsSprint';
import { Stack } from '@mui/material'

const CentralTask = ({ toogleLateralBar, usuarios, atualizarProjetos }) => {

  const { nomeEmpresa, idEmpresa, idProjeto, idSprint, index } = useParams();
  const navigate = useNavigate();

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  const handleOpenProject = () => {
    navigate(`/Home/${nomeEmpresa}/${idEmpresa}/Roadmap/${idProjeto}`);
  }

  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState(null);
  const [entregas, setEntregas] = useState([]);

  const atualizarSprints = async () => {
    const sprints = await getSprints(idSprint);
    setSprints(sprints);
  };

  const atualizarTasks = async () => {
    const entregas = await getTasks(idSprint);
    setEntregas(entregas);
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
      <Stack sx={{ flexDirection: 'row', alignItems: 'center' }}>
        <ArrowCircleLeftOutlinedIcon sx={{ cursor: 'pointer', fontSize: '45px', marginRight: 1 }} onClick={handleOpenProject} />
        <TituloHeader>
          Tarefas da sprint {index}
        </TituloHeader>
      </Stack>
      <MidleCarrousel>
        {entregas.map((entrega, index) => (
          <TarefaMini idSprint={entrega.idSprint} indice={index + 1} entrega={entrega} key={entrega.index} toogleModal={toogleModal} atualizarProjetos={atualizarProjetos} atualizarTasks={atualizarTasks} />
        ))}
        {usuarioLogado.permissao != 'FUNC' ?
          <TarefaMini toogleModal={toogleModal} atualizarProjetos={atualizarProjetos} atualizarTasks={atualizarTasks} entrega={null} />
          : null}
      </MidleCarrousel>

      <Modal showModal={showModal} fechar={toogleModal}
        form=<FormsTask task={task} toogleModal={toogleModal} atualizarSprints={atualizarSprints} usuarios={usuarios} idSprint={idSprint} atualizarProjetos={atualizarProjetos} atualizarTasks={atualizarTasks} />
      >
      </Modal>

    </BackCentral>
  )
}

export default CentralTask
