import { Stack } from "@mui/material"
import { CardSprint, ContainerFooter, ContainerSide, ContainerStep, MidleCarrouselNext } from "./NexStep.styles"

const NextStep = () => {
  return (
    <ContainerStep>
        <Stack sx={{flexDirection: 'row', width: '100%', gap: '0.5rem', height: '100%'}}>
        <ContainerSide></ContainerSide>
        <ContainerSide></ContainerSide>
        </Stack>
        <ContainerFooter>
            <MidleCarrouselNext>
            <CardSprint/>
            <CardSprint/>
            <CardSprint/>
            <CardSprint/>
            <CardSprint/>


            </MidleCarrouselNext>
        </ContainerFooter>
    </ContainerStep>
  )
}

export default NextStep
