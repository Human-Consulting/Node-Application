import { BodyCard, BoxBody, HeaderCard, Progress, ProgressBar, StatusCircle, Subtitle, Title } from './ProjectsCard.styles';
import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';

function ProjectsCard({ idProjeto, status, title, subtitle, image, progress }) {
  const navigate = useNavigate(); 

  let statusColor = '#08D13D';
  if (status == 0) {
    statusColor = '#08D13D';
  } else if (status == 1 && progress > 50) {
    statusColor = '#CED108';
  } else {
    statusColor = '#FF0707';
  }

  const handleOpenProject = () => {
    navigate(`/Home/task/${Number(idProjeto)}`);
    console.log('estou')
  }

  return (
    <>
      <BoxBody onClick={handleOpenProject}>
        <HeaderCard sx={{ backgroundImage: `URL(${image})` }} />
        <BodyCard>
          <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Title>{title}</Title>
            <MoreVertIcon sx={{ color: '#fff' }} />
          </Stack>
          <Subtitle>{subtitle}</Subtitle>
          <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <ProgressBar>
              <Progress sx={{ width: `${progress}%` }} />
            </ProgressBar>
            <Subtitle>{progress}%</Subtitle>
          </Stack>
        </BodyCard>
        <StatusCircle sx={{ border: `5px solid ${statusColor}` }}>
        </StatusCircle>
      </BoxBody>
    </>
  );
}

ProjectsCard.propTypes = {
  idProjeto: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired
}

export default ProjectsCard;
