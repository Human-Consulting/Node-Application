import { ImageBox, ProjectsTypesBox, SubTitle, Title } from './ProjectTypes.styles'
import { Stack } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

const ProjectsTypes = ({ entidade }) => {

  const { nomeEmpresa, idEmpresa } = useParams();

  const navigate = useNavigate()

  const handleOpenProject = () => {
    if (idEmpresa == 1) navigate(`/Home/${entidade.nome}/${Number(entidade.idEmpresa)}`);
    else navigate(`/Home/${nomeEmpresa}/${Number(idEmpresa)}/Roadmap/${entidade.descricao}/${Number(entidade.idProjeto)}`);
  }

  return (
    <ProjectsTypesBox onClick={handleOpenProject}>
      {entidade.urlImagem == null ? <ImageNotSupportedIcon/> : <ImageBox src={`data:image/png;base64,${entidade.urlImagem}`} />}
      <Stack sx={{ justifyContent: 'space-between', maxWidth: '80%' }}>
        <Title>
          {entidade.descricao || entidade.nome}
        </Title>
        <SubTitle>
          {idEmpresa == 1 ? `Esta empresa está ${entidade.progresso}% concluída` : `Este projeto está ${entidade.progresso}% concluido`}
        </SubTitle>
      </Stack>
    </ProjectsTypesBox>
  )
}

export default ProjectsTypes
