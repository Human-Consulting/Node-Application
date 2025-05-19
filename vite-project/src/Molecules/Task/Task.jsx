import React, { useEffect, useState } from 'react';
import { TaskBody, SprintBody } from './Task.styles';
import TaskCard from '../../Atoms/TaskCard/TaskCard';
import Modal from '../Modal/Modal';
import FormsTask from '../Forms/FormsTask';
import { getSprints } from '../../Utils/cruds/CrudsSprint';
import { useNavigate, useParams } from 'react-router';
import { ShaderGradient, ShaderGradientCanvas } from 'shadergradient';
import FormsSprint from '../Forms/FormsSprint';
import { Stack, Typography, Button } from '@mui/material';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';

const Task = ({ toogleLateralBar, atualizarProjetos, usuarios, showTitle }) => {

  const { idProjeto, idEmpresa, nomeEmpresa, tituloProjeto } = useParams();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [entidade, setEntidade] = useState(null);
  const [id, setId] = useState(null);
  const [acao, setAcao] = useState('');
  const [sprintsList, setSprintsList] = useState([]);

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

  const atualizarSprints = async () => {
    const sprints = await getSprints(idProjeto);
    setSprintsList(sprints);
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
  }, [idProjeto]);

  const toogleModal = (entidade, post, id) => {
    setAcao(post);
    setEntidade(entidade);
    setShowModal(!showModal);
    setId(id);
  };

  return (
    <>
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
      <TaskBody>
        {showTitle ?
          <Typography variant="h3" mt={3} sx={{ display: 'flex', alignItems: 'center', position: 'fixed', fontFamily: "Bebas Neue" }}><ArrowCircleLeftOutlinedIcon sx={{ cursor: 'pointer', fontSize: '45px', marginRight: 1 }} onClick={handleOpenProject} />{tituloProjeto} - Roadmap <Button variant='contained' sx={{ cursor: 'pointer', position: 'fixed', right: '2%' }} onClick={handleOpenDash}>Ir para Dashboard</Button></Typography>
          : <Stack sx={{ marginTop: '1.5rem' }} />}
        <SprintBody>

          {sprintsList.map((sprint, index) => (
            <TaskCard toogleTaskModal={toogleModal} sprint={sprint} index={index + 1} atualizarSprints={atualizarSprints} atualizarProjetos={atualizarProjetos} idEmpresa={idEmpresa} />
          ))}
          {usuarioLogado.permissao != 'FUNC' ?
            <TaskCard toogleTaskModal={toogleModal} />
            : null}
        </SprintBody>
      </TaskBody>

      <Modal showModal={showModal} fechar={toogleModal} acao={entidade == null ? null : acao}
        form={acao == 'task' ? <FormsTask task={entidade} toogleModal={toogleModal} usuarios={usuarios} idSprint={id} atualizarSprints={atualizarSprints} atualizarProjetos={atualizarProjetos} />
          : <FormsSprint sprint={entidade} toogleModal={toogleModal} fkProjeto={idProjeto} atualizarSprints={atualizarSprints} atualizarProjetos={atualizarProjetos} acao={null} />}
      >
      </Modal>
    </>
  )
}

export default Task
