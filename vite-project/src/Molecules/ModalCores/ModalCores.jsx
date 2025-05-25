import { Popover, Box, TextField, Button, Stack } from '@mui/material';
import { inputStyle } from "../Forms/Forms.styles.jsx";
import { Send, Restore } from '@mui/icons-material';
import { ToggleButton } from '@mui/material';
import { putCoresUsuario } from '../../Utils/cruds/CrudsUsuario.jsx';

const ModalCores = ({ color1, setColor1, color2, setColor2, color3, setColor3, animate, setAnimate, open, anchorEl, onClose }) => {

    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));

    const id = open ? 'tarefas-popover' : undefined;

    const handlePutCores = async () => {
        const coresData = `${color1}|${color2}|${color3}|${animate}`;
        await putCoresUsuario(coresData, usuarioLogado.idUsuario);
        onClose();
    }

    const handleResetPutCores = () => {
        setColor1('#606080');
        setColor2('#8d7dca');
        setColor3('#4e5e8c');
        setAnimate(true);
        handlePutCores();
    }

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <Box sx={{ width: 300, background: '#000', display: 'flex', padding: '2rem 1rem 2rem 1rem', flexDirection: 'column', gap: '1rem' }}>
                <TextField
                    label="Cor 1"
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ style: inputStyle.label }}
                    InputProps={{ style: inputStyle.input }}
                />

                <TextField
                    label="Cor 2"
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ style: inputStyle.label }}
                    InputProps={{ style: inputStyle.input }}
                />

                <TextField
                    label="Cor 3"
                    type="color"
                    value={color3}
                    onChange={(e) => setColor3(e.target.value)}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ style: inputStyle.label }}
                    InputProps={{ style: inputStyle.input }}
                />

                <ToggleButton
                    value="check"
                    selected={animate}
                    onChange={() => setAnimate((prev) => !prev)}
                    sx={{
                        background: animate
                            ? 'linear-gradient(45deg, #08D13D, #08D13D)'
                            : 'linear-gradient(45deg, #FF0707, #FF0707)',
                        color: 'white',
                        fontWeight: 'bold',
                        '&:hover': {
                            opacity: 0.9
                        }
                    }}
                >
                    {animate ? 'ANIMAÇÃO ON' : 'ANIMAÇÃO OFF'}
                </ToggleButton>

                <Stack sx={{ flexDirection: 'row', gap: '1rem' }}>

                    <Button variant="contained" onClick={handleResetPutCores} sx={{
                        background: 'linear-gradient(45deg, #606080, #8d7dca, #4e5e8c)',
                        color: 'white',
                        fontWeight: 'bold',
                        '&:hover': {
                            background: 'linear-gradient(45deg, #505070, #7c6cb9, #3e4d7b)',
                        },
                    }}>
                        RESET <Restore />
                    </Button>
                    <Button variant="contained" color="primary" onClick={handlePutCores} endIcon={<Send />} sx={{ flex: 1 }}>
                        Salvar
                    </Button>
                </Stack>
            </Box>
        </Popover>
    );
};

export default ModalCores;
