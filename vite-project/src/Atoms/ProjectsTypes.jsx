import { ImageBox, ProjectsTypesBox, SubTitle, Title } from './ProjectTypes.styles'
import { Stack } from '@mui/material'
import { useNavigate } from 'react-router'

const ProjectsTypes = ({ idEmpresa, projeto }) => {

  const navigate = useNavigate()

  const handleOpenProject = () => {
    navigate(`/Home/${idEmpresa}/task/${Number(projeto.idProjeto)}`);
  }

  return (
    <ProjectsTypesBox onClick={handleOpenProject}>
      <ImageBox src={`data:image/png;base64,${projeto.urlImagem}`} />
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
