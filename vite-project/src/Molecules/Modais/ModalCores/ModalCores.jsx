import { Popover, Box, TextField, Button, Stack, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { inputStyle } from "../../Modal/Forms/Forms.styles.jsx";
import { Send, Restore } from '@mui/icons-material';
import { putCoresUsuario } from '../../../Utils/cruds/CrudsUsuario.jsx';
import { useState } from 'react';

const ModalCores = ({ color1, setColor1, color2, setColor2, color3, setColor3, animate, setAnimate, open, anchorEl, onClose }) => {

    const usuarioLogado = JSON.parse(localStorage.getItem('usuario'));
    const [tempColor1, setTempColor1] = useState(color1);
    const [tempColor2, setTempColor2] = useState(color2);
    const [tempColor3, setTempColor3] = useState(color3);
    const [tempAnimate, setTempAnimate] = useState(animate);

    const id = open ? 'tarefas-popover' : undefined;
    const [presetSelecionado, setPresetSelecionado] = useState('');

    const handlePutCores = async () => {
        const coresData = `${color1}|${color2}|${color3}|${animate}`;
        await putCoresUsuario(coresData, usuarioLogado.idUsuario);
        usuarioLogado.cores = coresData;
        localStorage.setItem("usuario", JSON.stringify(usuarioLogado));
        onClose();
    }

    const handleResetPutCores = () => {
        const stringFinal = usuarioLogado?.cores || "#606080|#8d7dca|#4e5e8c|true";

        const [corOriginal1, corOriginal2, corOriginal3, animateStrOriginal] = stringFinal.split("|");
        setColor1(corOriginal1);
        setColor2(corOriginal2);
        setColor3(corOriginal3);
        setAnimate(true);
    }

    const presets = {
        roxo: ['#606080', '#8d7dca', '#4e5e8c'],
        azul: ['#1d3557', '#457b9d', '#a8dadc'],
        vermelho: ['#8b0000', '#c62828', '#ff8a80'],
        amarelo: ['#f1c40f', '#f39c12', '#fff3b0'],
        verde: ['#006400', '#2ecc71', '#b9fbc0'],
        tricolor: ['#ffffff', '#3b5998', '#d72638']
    };

    const aplicarPreset = (presetKey) => {
        const cores = presets[presetKey];
        if (cores) {
            setColor1(cores[0]);
            setColor2(cores[1]);
            setColor3(cores[2]);
            setPresetSelecionado(presetKey);
        }
    };

    return (
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={() => {
                handleResetPutCores();
                onClose();
            }}
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
                <FormControl fullWidth sx={{ backgroundColor: '#000', padding: 0 }}>
                    <InputLabel id="preset-label" sx={{ color: '#fff', backgroundColor: '#000', border: 'none', padding: 0 }}>
                        Conjuntos
                    </InputLabel>
                    <Select
                        labelId="preset-label"
                        value={presetSelecionado}
                        onChange={(e) => aplicarPreset(e.target.value)}
                        label="Presets de Cor"
                        sx={{
                            color: '#fff'
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    backgroundColor: '#000',
                                    border: '1px solid #333',
                                    color: '#fff'
                                }
                            }
                        }}
                    >
                        {Object.keys(presets).map((key) => (
                            <MenuItem
                                key={key}
                                value={key}
                                sx={{
                                    paddingBlock: '0.5rem',
                                    backgroundColor: '#000',
                                    color: '#fff',
                                    borderBlock: '1px solid #333',
                                    transition: 'border 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: '#000',
                                        border: `1px solid ${presets[key][0]}`
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: '#111',
                                        border: `1px solid ${presets[key][0]}`
                                    },
                                    '&.Mui-selected:hover': {
                                        backgroundColor: '#111',
                                        border: `1px solid ${presets[key][0]}`
                                    }
                                }}
                            >
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

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

                <Button
                    onClick={() => setAnimate((prev) => !prev)}
                    variant="outlined"
                    color={animate ? 'info' : 'error'}
                    sx={{
                        color: 'white',
                        fontWeight: 'bold',
                        '&:hover': {
                            opacity: 0.9
                        }
                    }}
                >
                    {animate ? 'ANIMAÇÃO ON' : 'ANIMAÇÃO OFF'}
                </Button>

                <Stack sx={{ flexDirection: 'row', gap: '1rem' }}>

                    <Button color='success' variant="outlined" onClick={handleResetPutCores} sx={{
                        color: 'white',
                        fontWeight: 'bold'
                    }}>
                        RESET <Restore />
                    </Button>
                    <Button variant="outlined" color="primary" onClick={handlePutCores} endIcon={<Send />} sx={{ flex: 1 }}>
                        Salvar
                    </Button>
                </Stack>
            </Box>
        </Popover>
    );
};

export default ModalCores;
