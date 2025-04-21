import { ImageBox, ProjectsTypesBox, SubTitle, Title } from './ProjectTypes.styles'
import { Stack } from '@mui/material'
import { useNavigate, useParams } from 'react-router'

const ProjectsTypes = ({ entidade }) => {

  const { nomeEmpresa, idEmpresa } = useParams();

  const navigate = useNavigate()

  const handleOpenProject = () => {
    if (idEmpresa == 1) navigate(`/Home/${entidade.nome}/${Number(entidade.idEmpresa)}`);
    else navigate(`/Home/${nomeEmpresa}/${Number(idEmpresa)}/Roadmap/${entidade.descricao}/${Number(entidade.idProjeto)}`);
  }

  return (
    <ProjectsTypesBox onClick={handleOpenProject}>
      <ImageBox src={`data:image/png;base64,${entidade.urlImagem}`} />
      <Stack sx={{ justifyContent: 'space-between' }}>
        <Title>
          {entidade.descricao || entidade.nome}
        </Title>
        <SubTitle>
          {idEmpresa == 1 ? `Esta empresa está ${entidade.progresso}% concluida` : `Este projeto está ${entidade.progresso}% concluido`}
        </SubTitle>
      </Stack>
    </ProjectsTypesBox>
  )
}

export default ProjectsTypes
