import { HeaderContent, MidleCarrousel, PrincipalContainerStyled, TituloHeader } from './PrincipalContainer.styles'
import { Stack, TextField, Button, Badge, Avatar, Tooltip } from '@mui/material'
import ProjectsCard from '../ProjectsCard/ProjectsCard'
import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal'
import ModalTarefas from '../ModalTarefas/ModalTarefas'
import FormsProjeto from './../Forms/FormsProjeto.jsx';
import FormsEmpresa from './../Forms/FormsEmpresa.jsx';
import { useNavigate, useParams } from 'react-router';
import { ArrowCircleLeftOutlined, Assignment, Construction, ColorLens, Search } from '@mui/icons-material';
import ModalCores from '../ModalCores/ModalCores.jsx';
import Shader from '../Shader/Shader.jsx';
import { getNome } from '../../Utils/getInfos';

const PrincipalContainer = ({ color1, setColor1, color2, setColor2, color3, setColor3, animate, setAnimate, toogleLateralBar, atualizarProjetos, atualizarEmpresas, projetos, empresas, usuarios, telaAtual }) => {

  const navigate = useNavigate();

  const { nomeEmpresa, idEmpresa } = useParams();


  const [showModal, setShowModal] = useState(false);
  const [projeto, setProjeto] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [acao, setAcao] = useState('');
  const [listaFiltrada, setListaFiltrada] = useState([]);


  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
  if (!usuarioLogado.permissao.includes("CONSULTOR") && idEmpresa == 1) navigate(-1);

  const filtrar = (texto) => {
    if (texto !== '') {
      const textoLower = texto.toLowerCase();
      let lista = [];

      if (idEmpresa != 1) {
        lista = projetos.filter(projeto => {
          const palavras = (projeto.descricao ?? '').toLowerCase().split(' ');
          return palavras.some(palavra => palavra.startsWith(textoLower));
        });

      } else {
        lista = empresas.filter(empresa => {
          const palavras = (empresa.nome ?? '').toLowerCase().split(' ');
          return palavras.some(palavra => palavra.startsWith(textoLower));
        });
      }
      setListaFiltrada(lista);

    } else {
      setListaFiltrada(idEmpresa == 1 ? empresas : projetos);
    }
  }

  useEffect(() => {
    toogleLateralBar();
    telaAtual();
    setListaFiltrada(idEmpresa == 1 && empresas.length > 1 ? empresas.slice(1) : projetos);
    // setListaFiltrada(idEmpresa == 1 && empresas.length > 0 ? empresas : projetos);
  }, [projetos, empresas, idEmpresa]);

  const toogleModal = (entidade, acao) => {
    setAcao(acao);
    setEmpresa(entidade);
    setProjeto(entidade);
    setShowModal(!showModal);
  };

  const handleOpenEmpresas = () => {
    navigate(`/Home/Empresas/${Number(1)}`);
  }

  const [anchorTarefa, setAnchorTarefa] = useState(null);
  const [anchorCores, setAnchorCores] = useState(null);

  const handleBadgeClickTarefa = (event) => {
    setAnchorTarefa(event.currentTarget);
  };

  const handleBadgeClickCores = (event) => {
    setAnchorCores(event.currentTarget);
  };

  const handlePopoverCloseTarefa = () => {
    setAnchorTarefa(null);
  };

  const handlePopoverCloseCores = () => {
    setAnchorCores(null);
  };

  const openPopoverTarefas = Boolean(anchorTarefa);
  const openPopoverCores = Boolean(anchorCores);

  return (
    <PrincipalContainerStyled>
      <HeaderContent>
        <Shader animate={animate} color1={color1} color2={color2} color3={color3} index={5} />
        <Stack sx={{ flexDirection: 'row', width: '100%', gap: '1rem', position: 'relative', zIndex: '6', alignItems: 'center' }}>
          <Avatar
            sx={{
              width: 56,
              height: 56,
              fontWeight: "bold",
              fontSize: "0.9rem",
              color: "white",
              backgroundColor: "#1D1D1D",
              cursor: "pointer",
              position: "relative",
              backgroundPosition: "center",
              transition: "0.52s ease",
              "&:hover": {
                backgroundImage: `url(data:image/png;base64,${empresas[0]?.urlImagem || projetos[0]?.urlImagemEmpresa})`,
                backgroundSize: "cover",
                color: "transparent", // esconde a letra no hover
              },
            }}
          >
            {getNome(usuarioLogado.nome)}
          </Avatar>

          <TextField
            onChange={(e) => filtrar(e.target.value)}
            label=
            {idEmpresa == 1 ?
              <Stack sx={{ flexDirection: 'row', gap: 0.5 }}> <Search /> Pesquisar por uma empresa...</Stack>
              :
              <Stack sx={{ flexDirection: 'row', gap: 0.5 }}><Search /> Pesquisar um projeto da <Stack style={{ color: '#90caf9' }}>{nomeEmpresa}</Stack></Stack>
            }

            size="small"
            sx={{ flex: 1, borderRadius: '10px', backgroundColor: '#1D1D1D' }}
            autoComplete="off"
            InputLabelProps={{
              sx: {
                color: "white",
                '&.Mui-focused': {
                  color: 'white',
                }
              }
            }}
            InputProps={{
              sx: {
                color: "white",
                '& .MuiOutlinedInput-notchedOutline': {
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#fff'
                }
              }
            }} />
          {
            !usuarioLogado.permissao.includes('CONSULTOR') ?
              <Tooltip title="Tarefas abertas em seu nome.">
                <Badge onClick={handleBadgeClickTarefa}
                  sx={{
                    '& .MuiBadge-badge': {
                      fontSize: '1.25rem',
                      height: '26px',
                      width: '26px',
                      cursor: 'pointer'
                    }
                  }} badgeContent={usuarioLogado.qtdTarefas} color={usuarioLogado.comImpedimento ? "error" : "primary"}>
                  <Assignment sx={{ fontSize: 32, cursor: 'pointer' }} />
                </Badge>
              </Tooltip>
              : idEmpresa == 1 ?
                <Button onClick={() => toogleModal(null, 'empresa')}
                  variant="contained">
                  CRIAR EMPRESA
                </Button>
                :
                <Button onClick={() => toogleModal(null, 'projeto')}
                  variant="contained">
                  CRIAR PROJETO
                </Button>
          }
          <Tooltip title="Editar cor de fundo.">
            <ColorLens onClick={handleBadgeClickCores}
              sx={{
                height: '40px',
                width: '40px',
                cursor: 'pointer'
              }} />
          </Tooltip>

        </Stack>
        <TituloHeader>{idEmpresa != 1 && usuarioLogado.permissao.includes('CONSULTOR') ? <ArrowCircleLeftOutlined sx={{ cursor: 'pointer', fontSize: '45px' }} onClick={handleOpenEmpresas} /> : null} {idEmpresa == 1 ? "MINHAS EMPRESAS" : "MEUS PROJETOS"}</TituloHeader>
      </HeaderContent>
      <MidleCarrousel>
        {listaFiltrada?.length > 0 ? (
          listaFiltrada.map(item => (
            <ProjectsCard
              key={item.id}
              item={item}
              toogleModal={toogleModal}
              atualizarProjetos={atualizarProjetos}
              atualizarEmpresas={atualizarEmpresas}
            />
          ))
        ) : (!usuarioLogado.permissao.includes('CONSULTOR')) && (
          <Stack sx={{ justifyContent: 'center', alignItems: 'center', marginTop: '2rem', width: '350%' }}>
            <Construction sx={{ fontSize: '5rem' }} />
            Nenhum projeto encontrado!
          </Stack>
        )}

        {usuarioLogado.permissao.includes('CONSULTOR') ?
          <ProjectsCard toogleModal={toogleModal} ></ProjectsCard>
          : null}
      </MidleCarrousel>
      <Modal
        showModal={showModal}
        fechar={toogleModal}
        form={acao == 'projeto' ? <FormsProjeto projeto={projeto} toogleModal={toogleModal} atualizarProjetos={atualizarProjetos} usuarios={usuarios} fkEmpresa={idEmpresa} />
          :
          <FormsEmpresa empresa={empresa} toogleModal={toogleModal} atualizarEmpresas={atualizarEmpresas} />}
      >
      </Modal>
      <ModalTarefas
        tarefas={usuarioLogado.tarefasVinculadas}
        open={openPopoverTarefas}
        anchorEl={anchorTarefa}
        onClose={handlePopoverCloseTarefa}
      />
      <ModalCores
        color1={color1}
        setColor1={setColor1}
        color2={color2}
        setColor2={setColor2}
        color3={color3}
        setColor3={setColor3}
        animate={animate}
        setAnimate={setAnimate}
        open={openPopoverCores}
        anchorEl={anchorCores}
        onClose={handlePopoverCloseCores}
      />
    </PrincipalContainerStyled>

  )
}

export default PrincipalContainer
