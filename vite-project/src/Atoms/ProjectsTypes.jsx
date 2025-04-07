import { ImageBox, ProjectsTypesBox, SubTitle, Title } from './ProjectTypes.styles'
import { Stack } from '@mui/material'
import { useNavigate } from 'react-router'

const ProjectsTypes = ({ projeto }) => {

  const navigate = useNavigate()

  const handleOpenProject = () => {
    navigate(`/Home/task/${Number(projeto.idProjeto)}`);
  }

  return (
    <ProjectsTypesBox onClick={handleOpenProject}>
      <ImageBox src={projeto.urlImage} />
      <Stack sx={{ justifyContent: 'space-between' }}>
        <Title>
          {projeto.descricao}
        </Title>
        <SubTitle>
          {projeto.subtitle} Este projeto está {projeto.progresso}% completo
        </SubTitle>
      </Stack>
    </ProjectsTypesBox>
  )
}

export default ProjectsTypes
