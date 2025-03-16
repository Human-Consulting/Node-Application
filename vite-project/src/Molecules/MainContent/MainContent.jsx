
import { BoxAltertive } from './MainContent.styles'
import LateralBar from '../LateralBar'
import PrincipalContainer from '../PrincipalContainer'
import LateralBarRight from '../LateralBarRight/LateralBarRight'
const MainContent = () => {
    return (
        <BoxAltertive>
            <LateralBar></LateralBar>
            <PrincipalContainer>
            </PrincipalContainer>
            <LateralBarRight/>
        </BoxAltertive>

    )
}

export default MainContent
