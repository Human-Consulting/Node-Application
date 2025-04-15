import "./BotaoLateral.css"
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const BotaoLateral = ({toogleModal}) => {

    const handleToogleModal = () => {
        toogleModal(null);
    }


    return (
        <Button sx={{position: 'absolute'}} variant="contained" className="botaoLateral" onClick={handleToogleModal} ><AddIcon/></Button>
    )
}

export default BotaoLateral;