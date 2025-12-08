import {
  Popover,
  Box,
  TextField,
  Button,
  Stack,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from "@mui/material";
import { Send, Restore } from "@mui/icons-material";
import { putCoresUsuario } from "../../../Utils/cruds/CrudsUsuario.jsx";
import { useState, useContext } from "react";
import { useTheme } from "@mui/material/styles";
import { ThemeContext } from "../../../Utils/themeContext.jsx";

const ModalCores = ({
  color1,
  setColor1,
  color2,
  setColor2,
  color3,
  setColor3,
  animate,
  setAnimate,
  open,
  anchorEl,
  onClose
}) => {
  const theme = useTheme();

  const { primaryColor, setPrimaryColor, toggle, isDark } =
    useContext(ThemeContext);

  const usuarioLogado = JSON.parse(localStorage.getItem("usuario"));
  const [presetSelecionado, setPresetSelecionado] = useState("");

  const id = open ? "tarefas-popover" : undefined;

  const handlePutCores = async () => {
    const coresData = `${color1}|${color2}|${color3}|${animate}`;
    await putCoresUsuario(coresData, usuarioLogado.idUsuario);
    usuarioLogado.cores = coresData;
    localStorage.setItem("usuario", JSON.stringify(usuarioLogado));
    onClose();
  };

  const handleResetPutCores = () => {
    const stringFinal =
      usuarioLogado?.cores || "#606080|#8d7dca|#4e5e8c|true";

    const [corOriginal1, corOriginal2, corOriginal3] =
      stringFinal.split("|");

    setColor1(corOriginal1);
    setColor2(corOriginal2);
    setColor3(corOriginal3);
    setAnimate(true);
  };

  const presets = {
    roxo: ["#606080", "#8d7dca", "#4e5e8c"],
    azul: ["#1d3557", "#457b9d", "#a8dadc"],
    vermelho: ["#8b0000", "#c62828", "#ff8a80"],
    amarelo: ["#f1c40f", "#f39c12", "#fff3b0"],
    verde: ["#006400", "#2ecc71", "#b9fbc0"],
    tricolor: ["#ffffff", "#3b5998", "#d72638"]
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
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Box
        sx={{
          width: 300,
          backgroundColor: theme.palette.background.paper,
          display: "flex",
          padding: "2rem 1rem",
          flexDirection: "column",
          gap: "1rem",
          color: theme.palette.text.primary
        }}
      >
       
        {/* ✅ BOTÃO DARK / LIGHT */}
        <Button variant="outlined" onClick={toggle}>
          {isDark ? "Modo Claro" : "Modo Escuro"}
        </Button>

        {/* ✅ CORES DO SHADER */}
        {[["Cor 1", color1, setColor1], ["Cor 2", color2, setColor2], ["Cor 3", color3, setColor3]].map(
          ([label, value, setValue]) => (
            <TextField
              key={label}
              label={label}
              type="color"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              fullWidth
              variant="outlined"
              InputLabelProps={{
                sx: { color: theme.palette.text.secondary }
              }}
              InputProps={{
                sx: {
                  backgroundColor:
                    theme.palette.mode === "dark"
                      ? "#121212"
                      : "#fff"
                }
              }}
            />
          )
        )}

        {/* ✅ BOTÃO DE ANIMAÇÃO */}
        <Button
          onClick={() => setAnimate((prev) => !prev)}
          variant="outlined"
          color={animate ? "info" : "error"}
        >
          {animate ? "ANIMAÇÃO ON" : "ANIMAÇÃO OFF"}
        </Button>

        {/* ✅ AÇÕES */}
        <Stack direction="row" spacing={1}>
          <Button
            color="warning"
            variant="outlined"
            onClick={handleResetPutCores}
          >
            RESET <Restore />
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={handlePutCores}
            endIcon={<Send />}
            sx={{ flex: 1 }}
          >
            Salvar
          </Button>
        </Stack>
      </Box>
    </Popover>
  );
};

export default ModalCores;
