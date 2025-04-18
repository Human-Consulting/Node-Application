import { ImageBox, ProjectsTypesBox, SubTitle, Title } from './ProjectTypes.styles'
import { Stack } from '@mui/material'
import { useNavigate, useParams } from 'react-router'

const ProjectsTypes = ({ projeto }) => {

  const { nomeEmpresa, idEmpresa } = useParams();

  const navigate = useNavigate()

  const handleOpenProject = () => {
    navigate(`/Home/${nomeEmpresa}/${Number(idEmpresa)}/Roadmap/${Number(projeto.idProjeto)}`);
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
