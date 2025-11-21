import { HeaderContent, MidleCarrousel, PrincipalContainerStyled, TituloHeader, CardsList } from './PrincipalContainer.styles'
import ProjectsCard from '../ProjectsCard/ProjectsCard'
import { useEffect, useState } from 'react';
import Modal from '../Modal/Modal'
import ModalTarefas from '../Modais/ModalTarefas/ModalTarefas.jsx'
import FormsProjeto from '../Modal/Forms/FormsProjeto.jsx';
import FormsEmpresa from '../Modal/Forms/FormsEmpresa.jsx';
import { useNavigate, useParams } from 'react-router';
import { Stack, TextField, Button, Badge, Avatar, Tooltip, Pagination } from '@mui/material'
import { ArrowCircleLeftOutlined, Construction, ColorLens, Search, CalendarMonth } from '@mui/icons-material';
import ModalCores from '../Modais/ModalCores/ModalCores.jsx';
import Shader from '../Shader/Shader.jsx';
import { getNome } from '../../Utils/getInfos';

const PrincipalContainer = ({ color1, setColor1, color2, setColor2, color3, setColor3, animate, setAnimate, toogleLateralBar, atualizarProjetos, atualizarEmpresas, projetos, pagesProjetos, empresas, pagesEmpresas, usuarios, telaAtual }) => {

  const navigate = useNavigate();

  const { nomeEmpresa, idEmpresa } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [projeto, setProjeto] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [acao, setAcao] = useState('');
  const [listaFiltrada, setListaFiltrada] = useState([]);

  const [totalPages, setTotalPages] = useState((nomeEmpresa == 'Empresas' ? pagesEmpresas : pagesProjetos) || 0);

  const [page, setPage] = useState(0);

  const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
  if (!usuarioLogado?.permissao?.includes("CONSULTOR") && (nomeEmpresa != usuarioLogado?.nomeEmpresa)) navigate(-1);

  const filtrar = async (texto) => {
    if (texto !== '') {
      const textoLower = texto.toLowerCase();

      if (nomeEmpresa != "Empresas") await atualizarProjetos(0, textoLower);
      else await atualizarEmpresas(0, textoLower);

    } else {
      if (nomeEmpresa != "Empresas") await atualizarProjetos(0);
      else await atualizarEmpresas(0);
    }
  }

  useEffect(() => {
    toogleLateralBar();
    telaAtual();
    setListaFiltrada(nomeEmpresa == "Empresas" && empresas.length > 0 ? empresas : projetos);
  }, [projetos, empresas, idEmpresa, nomeEmpresa, pagesEmpresas, pagesProjetos]);

  useEffect(() => {
    nomeEmpresa == 'Empresas' ? atualizarEmpresas(page) : atualizarProjetos(page);
  }, [page])

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
        <Shader animate={animate} color1={color1} color2={color2} color3={color3} index={1} />
        <Stack
  sx={{
    flexDirection: 'row',
    width: '100%',
    gap: '1rem',
    position: 'relative',
    zIndex: '6',
    alignItems: 'center'
  }}
>
  <Avatar
    sx={(theme) => ({
      width: 56,
      height: 56,
      fontWeight: "bold",
      fontSize: "0.9rem",
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.background.paper,
      cursor: "pointer",
      position: "relative",
      backgroundPosition: "center",
      transition: "0.52s ease",
      "&:hover": {
        backgroundImage: `url(data:image/png;base64,${empresas[0]?.urlImagem || projetos[0]?.urlImagemEmpresa})`,
        backgroundSize: "cover",
        color: "transparent",
      },
    })}
  >
    {getNome(usuarioLogado.nome)}
  </Avatar>

  <TextField
    onChange={(e) => filtrar(e.target.value)}
    label={nomeEmpresa == "Empresas" ?
      <Stack sx={{ flexDirection: 'row', gap: 0.5 }}> <Search /> Pesquisar por uma empresa...</Stack>
      :
      <Stack sx={{ flexDirection: 'row', gap: 0.5 }}>
        <Search /> Pesquisar um projeto da
        <Stack style={{ color: '#90caf9' }}>{nomeEmpresa}</Stack>
      </Stack>
    }
    size="small"
    sx={(theme) => ({
      flex: 1,
      borderRadius: '10px',
      backgroundColor: theme.palette.background.paper
    })}
    autoComplete="off"
    InputLabelProps={{
      sx: (theme) => ({
        color: theme.palette.text.secondary,
        '&.Mui-focused': {
          color: theme.palette.text.primary,
        },
      }),
    }}
    InputProps={{
      sx: (theme) => ({
        color: theme.palette.text.primary,
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.main,
        },
      }),
    }}
  />

  <Pagination
    count={totalPages}
    page={page + 1}
    onChange={(e, value) => setPage(value - 1)}
    color="primary"
    siblingCount={5}
    boundaryCount={5}
    sx={(theme) => ({
      "& .MuiPaginationItem-root": {
        color: theme.palette.text.primary,
      },
    })}
  />
</Stack>

        <TituloHeader>{nomeEmpresa != "Empresas" && usuarioLogado?.permissao?.includes('CONSULTOR') ?
          <ArrowCircleLeftOutlined sx={{ cursor: 'pointer', fontSize: '45px', marginRight: 1 }} onClick={handleOpenEmpresas} /> : null}
          {nomeEmpresa == "Empresas" ? "MINHAS EMPRESAS" : "MEUS PROJETOS"}
        </TituloHeader>
      </HeaderContent>
      <MidleCarrousel>
        <CardsList>
          {listaFiltrada?.length > 0 ? (
            listaFiltrada.map(item => (
              <ProjectsCard
                key={item.id}
                item={item}
                toogleModal={toogleModal}
              />
            ))
          ) : (!usuarioLogado?.permissao?.includes('CONSULTOR')) && (
            <Stack sx={{ justifyContent: 'center', alignItems: 'center', marginTop: '2rem', width: '350%' }}>
              <Construction sx={{ fontSize: '5rem' }} />
              Nenhum projeto encontrado!
            </Stack>
          )}
          {/* {usuarioLogado?.permissao?.includes('CONSULTOR') ?
            <ProjectsCard toogleModal={toogleModal} ></ProjectsCard>
            : null} */} 
            {/* //? Deixar com ou só o botão no */}
        </CardsList>

        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} sx={{ marginTop: '2rem' }}>
          <Pagination
            count={totalPages}
            page={page + 1}
            onChange={(e, value) => setPage(value - 1)}
            color="primary"
            siblingCount={5}
            boundaryCount={5}
            sx={{ "& .MuiPaginationItem-root": { color: "#fff" } }}
          />
        </Stack>
      </MidleCarrousel>

      <Modal
        showModal={showModal}
        fechar={toogleModal}
        entidade={acao == 'projeto' ? projeto : empresa}
        form={acao == 'projeto' ? <FormsProjeto projeto={projeto} toogleModal={toogleModal} atualizarProjetos={atualizarProjetos} fkEmpresa={idEmpresa} />
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

export default PrincipalContainer;
