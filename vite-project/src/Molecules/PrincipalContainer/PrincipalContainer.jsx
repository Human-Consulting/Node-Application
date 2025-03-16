import { ButtonFilter, HeaderContent, InputSearch, MidleCarrousel, PrincipalContainerStyled, TituloHeader } from './PrincipalContainer.styles'
import { Avatar, Stack } from '@mui/material'
import ProjectsCard from '../ProjectsCard/ProjectsCard'
import MockList from '../../Mock/MockList/MockList'
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const PrincipalContainer = () => {
    return (
        <PrincipalContainerStyled>
                <HeaderContent>
                    <Stack sx={{flexDirection: 'row', width: '100%', gap: '1rem'}}>
                    <Avatar>OP</Avatar>
                    <ButtonFilter><FilterAltIcon/>Filtrar</ButtonFilter>
                        <InputSearch sx={{background: 'none'}} type='text' placeholder='Pesquise um projeto...'/>
                    </Stack>
                    <TituloHeader>Seus projetos</TituloHeader>
                </HeaderContent>
                <MidleCarrousel>
                    {MockList.map(Card => (
                    <ProjectsCard image={Card.image} subtitle={Card.subtitle} title={Card.title} key={Card.id} numberId={Card.id} status = {Card.status} progress={Card.progresso}></ProjectsCard>
                    ))}
                </MidleCarrousel>
        </PrincipalContainerStyled>
    )
 }

export default PrincipalContainer
