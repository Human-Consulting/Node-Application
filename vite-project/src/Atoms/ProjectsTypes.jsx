import { ImageBox, ProjectsTypesBox, SubTitle, Title } from './ProjectTypes.styles'
import PropTypes from 'prop-types'
import { Stack } from '@mui/material'

const ProjectsTypes = ({urlImage, title, subtitle, progresso}) => {
  return (
    <ProjectsTypesBox>
        <ImageBox src={urlImage}/>
        <Stack sx={{justifyContent: 'space-between'}}>
            <Title>
                {title}
            </Title>
            <SubTitle>
               {subtitle} - este projeto está {progresso}% completo
            </SubTitle>
        </Stack>
    </ProjectsTypesBox>
  )
}
ProjectsTypes.propTypes = {
    urlImage: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    progresso: PropTypes.number.isRequired,

}
export default ProjectsTypes
