import { BodyCard, BoxBody, HeaderCard, Progress, ProgressBar, StatusCircle, Subtitle, Title } from './ProjectsCard.styles';
import { Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteProjeto } from './../../Utils/cruds/CrudsProjeto.jsx';

function ProjectsCard({ projeto, toogleProjetoModal }) {
  const navigate = useNavigate();

  let statusColor = '#08D13D';
  if (projeto.com_impedimento == 0) {
    statusColor = '#08D13D';
  } else if (projeto.com_impedimento == 1 && projeto.progresso > 50) {
    statusColor = '#CED108';
  } else {
    statusColor = '#FF0707';
  }

  const handleOpenProject = () => {
    navigate(`/Home/task/${Number(projeto.idProjeto)}`);
  }

  const handleOpenModalPutProjeto = () => {
    toogleProjetoModal(projeto, 'card');
  }

  const handleDeleteProjeto = () => {
    deleteProjeto(projeto.idProjeto, toogleProjetoModal);
  }

  return (
    <>
      <BoxBody onClick={handleOpenProject}>
        <HeaderCard sx={{ backgroundImage: `URL(${projeto.image})` }} />
        <BodyCard>
          <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title>Orçamento: R${projeto.orcamento}</Title>
            <DeleteIcon sx={{ color: '#fff', position: 'absolute', right: '40px', cursor: 'pointer' }} onClick={(e) => {
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
    </>
  );
}

export default ProjectsCard;
