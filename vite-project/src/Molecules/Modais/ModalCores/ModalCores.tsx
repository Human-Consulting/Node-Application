import { Popover, Box, TextField, Button, Stack, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import { inputStyle } from "../../Modal/Forms/Forms.styles";
import { Send, Restore } from '@mui/icons-material';
import { putCoresUsuario } from '../../../Utils/cruds/CrudsUsuario';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useTheme } from '../../../context/ThemeContext';

interface ModalCoresProps {
    open: boolean;
    // PrincipalContainer.tsx tracks its anchor as the broader `Element`
    // (from a generic MouseEvent<Element>), while CentralTask/Dashboard/Task
    // use `HTMLElement` - `Element` covers both.
    anchorEl: Element | null;
    onClose: () => void;
}

type PresetKey = 'roxo' | 'azul' | 'vermelho' | 'amarelo' | 'verde' | 'tricolor';

const presets: Record<PresetKey, [string, string, string]> = {
    roxo: ['#606080', '#8d7dca', '#4e5e8c'],
    azul: ['#1d3557', '#457b9d', '#a8dadc'],
    vermelho: ['#8b0000', '#c62828', '#ff8a80'],
    amarelo: ['#f1c40f', '#f39c12', '#fff3b0'],
    verde: ['#006400', '#2ecc71', '#b9fbc0'],
    tricolor: ['#ffffff', '#3b5998', '#d72638']
};

// No list to fetch/invalidate here - `useTheme()` already owns the color
// state (see ThemeContext.tsx), so this modal stays plain async handlers
// rather than React Query.
const ModalCores = ({ open, anchorEl, onClose }: ModalCoresProps) => {

    const { usuario: usuarioLogado, setUsuario } = useAuth();
    const { color1, setColor1, color2, setColor2, color3, setColor3, animate, setAnimate } = useTheme();

    const id = open ? 'tarefas-popover' : undefined;
    const [presetSelecionado, setPresetSelecionado] = useState<PresetKey | ''>('');

    const handlePutCores = async () => {
        if (!usuarioLogado) return;
        const coresData = `${color1}|${color2}|${color3}|${animate}`;
        await putCoresUsuario(coresData, usuarioLogado.idUsuario);
        setUsuario({ ...usuarioLogado, cores: coresData });
        onClose();
    }

    const handleResetPutCores = () => {
        const stringFinal = usuarioLogado?.cores || "#606080|#8d7dca|#4e5e8c|true";

        const [corOriginal1, corOriginal2, corOriginal3] = stringFinal.split("|");
        setColor1(corOriginal1);
        setColor2(corOriginal2);
        setColor3(corOriginal3);
        setAnimate(true);
    }

    const aplicarPreset = (presetKey: PresetKey) => {
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
            <Box sx={{ width: 300, background: 'background.default', display: 'flex', padding: '2rem 1rem 2rem 1rem', flexDirection: 'column', gap: '1rem' }}>
                <FormControl fullWidth sx={{ backgroundColor: 'background.default', padding: 0 }}>
                    <InputLabel id="preset-label" sx={{ color: 'text.primary', backgroundColor: 'background.default', border: 'none', padding: 0 }}>
                        Conjuntos
                    </InputLabel>
                    <Select
                        labelId="preset-label"
                        value={presetSelecionado}
                        onChange={(e: SelectChangeEvent) => aplicarPreset(e.target.value as PresetKey)}
                        label="Presets de Cor"
                        sx={{
                            color: 'text.primary'
                        }}
                        MenuProps={{
                            PaperProps: {
                                sx: {
                                    backgroundColor: 'background.default',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    color: 'text.primary'
                                }
                            }
                        }}
                    >
                        {(Object.keys(presets) as PresetKey[]).map((key) => (
                            <MenuItem
                                key={key}
                                value={key}
                                sx={{
                                    paddingBlock: '0.5rem',
                                    backgroundColor: 'background.default',
                                    color: 'text.primary',
                                    borderBlock: '1px solid',
                                    borderColor: 'divider',
                                    transition: 'border 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: 'background.default',
                                        border: `1px solid ${presets[key][0]}`
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: 'background.paper',
                                        border: `1px solid ${presets[key][0]}`
                                    },
                                    '&.Mui-selected:hover': {
                                        backgroundColor: 'background.paper',
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
                    InputLabelProps={{ sx: inputStyle.label }}
                    InputProps={{ sx: inputStyle.input }}
                />
                <TextField
                    label="Cor 2"
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ sx: inputStyle.label }}
                    InputProps={{ sx: inputStyle.input }}
                />
                <TextField
                    label="Cor 3"
                    type="color"
                    value={color3}
                    onChange={(e) => setColor3(e.target.value)}
                    fullWidth
                    variant="outlined"
                    InputLabelProps={{ sx: inputStyle.label }}
                    InputProps={{ sx: inputStyle.input }}
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
