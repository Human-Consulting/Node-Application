
import { useNavigate, useParams } from 'react-router';
import TarefaMini from '../TarefaMini/TarefaMini';
import { BackCentral, MidleCarrousel, TituloHeader } from './CentralTask.styles';
import { useEffect, useState } from 'react';
import { getTasks } from '../../Utils/cruds/CrudsTask';
import Modal from '../Modal/Modal';
import FormsTask from '../Forms/FormsTask';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { getSprints } from '../../Utils/cruds/CrudsSprint';
import { Stack, Typography, Button } from '@mui/material';
import { ShaderGradient, ShaderGradientCanvas } from 'shadergradient';

const CentralTask = ({ toogleLateralBar, usuarios, atualizarProjetos }) => {

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
      <ShaderGradientCanvas
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
              }}
            >
              <ShaderGradient
                control='query'
                urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=180&cDistance=2.8&cPolarAngle=80&cameraZoom=8.3&color1=%23606080&color2=%238d7dca&color3=%234e5e8c&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=60&frameRate=10&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=2.4&positionX=-1.3&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=40&rotationY=170&rotationZ=-60&shader=defaults&type=sphere&uAmplitude=1.7&uDensity=1.2&uFrequency=0&uSpeed=0.1&uStrength=2.1&uTime=8&wireframe=false&zoomOut=true'
              />
            </ShaderGradientCanvas>
        <Typography variant="h3" mt={3} mb={2} sx={{ display: 'flex', alignItems: 'center', position: 'relative', fontFamily: "Bebas Neue" }}>
          <ArrowCircleLeftOutlinedIcon sx={{ cursor: 'pointer', fontSize: '45px', marginRight: 1 }} onClick={handleOpenProject} />
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
