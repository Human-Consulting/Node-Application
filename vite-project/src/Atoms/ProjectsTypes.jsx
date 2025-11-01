import { ImageBox, ProjectsTypesBox, SubTitle, Title } from './ProjectTypes.styles';
import { Stack } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

const ProjectsTypes = ({ entidade, diminuirLateralBar, telaAtual }) => {
  const { nomeEmpresa, idEmpresa, idProjeto } = useParams();
  const navigate = useNavigate();

  const handleOpenProject = () => {
    if (nomeEmpresa == 'Empresas') {
      navigate(`/Home/${entidade.nome}/${Number(entidade.idEmpresa)}`);
    } else {
      navigate(`/Home/${nomeEmpresa}/${Number(idEmpresa)}/Roadmap/${entidade.titulo}/${Number(entidade.idProjeto)}`);
    }
  };

  const renderImagem = () => {
    if (!entidade.urlImagem) {
      return (
        <Stack
          sx={{
            width: 42,
            height: 42,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px'
          }}
        >
          <ImageNotSupportedIcon sx={{ fontSize: 24, color: '#999' }} />
        </Stack>
      );
    }

    return <ImageBox src={`data:image/png;base64,${entidade.urlImagem}`} />;
  };

  return (
    <ProjectsTypesBox diminuido={diminuirLateralBar} onClick={handleOpenProject} idAtual={idProjeto} idItem={entidade?.idProjeto}>
      {renderImagem()}
      <Stack sx={{ justifyContent: 'space-between', maxWidth: '80%' }}>
        <Title diminuido={diminuirLateralBar}>
          {entidade.titulo || entidade.nome}
        </Title>
        {!diminuirLateralBar && (
          <SubTitle>
            {nomeEmpresa == 'Empresas'
              ? `Esta empresa está ${Math.floor(entidade.progresso)}% concluída`
              : `Este projeto está ${Math.floor(entidade.progresso)}% concluído`}
          </SubTitle>
        )}
      </Stack>
    </ProjectsTypesBox>
  );
};

export default ProjectsTypes;
