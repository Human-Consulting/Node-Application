import { BodyCard, BoxBody, HeaderCard, Progress, ProgressBar, StatusCircle, Subtitle, Title } from './ProjectsCard.styles';
import { Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteProjeto } from './../../Utils/cruds/CrudsProjeto.jsx';

function ProjectsCard({ idEmpresa, projeto, toogleProjetoModal, atualizarProjetos }) {
  const navigate = useNavigate();

  let statusColor = '#08D13D';
  if (projeto) {
    if (projeto.comImpedimento == 0) {
      statusColor = '#08D13D';
    } else if (projeto.comImpedimento == 1 && projeto.progresso > 50) {
      statusColor = '#CED108';
    } else {
      statusColor = '#FF0707';
    }
  }

  const handleOpenProject = () => {
    navigate(`/Home/${idEmpresa}/task/${Number(projeto.idProjeto)}`);
  }

  const handleOpenModalPostProjeto = () => {
    toogleProjetoModal(null);
  }

  const handleOpenModalPutProjeto = () => {
    toogleProjetoModal(projeto);
  }

  const handleDeleteProjeto = async () => {
    await deleteProjeto(projeto.idProjeto);
    await atualizarProjetos();
  }

  return (
    <>
      {projeto ?
        <BoxBody onClick={handleOpenProject}>
          <HeaderCard sx={{
            backgroundImage: `url(data:image/png;base64,${projeto.urlImagem})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }} />
          <BodyCard>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Title>{projeto.nomeResponsavel}</Title>
              <DeleteIcon sx={{ color: '#fff', position: 'absolute', right: '40px', cursor: 'pointer', transition: '1s' }} onClick={(e) => {
                e.stopPropagation();
                handleDeleteProjeto();
              }} />
              <EditIcon sx={{ color: '#fff', position: 'absolute', right: '8px', cursor: 'pointer' }} onClick={(e) => {
                e.stopPropagation();
                handleOpenModalPutProjeto();
              }} />
            </Stack>
            <Subtitle>{projeto.descricao}</Subtitle>
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <ProgressBar>
                <Progress sx={{ width: `${projeto.progresso}%` }} />
              </ProgressBar>
              <Subtitle>{projeto.progresso}%</Subtitle>
            </Stack>
          </BodyCard>
          <StatusCircle sx={{ border: `5px solid ${statusColor}` }}>
          </StatusCircle>
        </BoxBody>
        :
        <BoxBody onClick={handleOpenModalPostProjeto} sx={{height: '224px', justifyContent: 'center', alignItems: 'center'}}>
          <BodyCard sx={{top: '25%', justifyContent: 'center', alignItems: 'center'}}>
            <Button
              variant="contained">
              CRIAR NOVO PROJETO
            </Button>
          </BodyCard>
        </BoxBody>}
    </>
  );
}

export default ProjectsCard;
