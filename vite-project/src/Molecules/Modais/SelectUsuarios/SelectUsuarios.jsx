import { useState, useEffect, useContext } from "react";
import {
  Select,
  MenuItem,
  Typography,
  Box,
  Stack,
  Pagination,
  Grow,
  TextField
} from "@mui/material";
import { inputStyle } from "../../Modal/Forms/Forms.styles.jsx";
import { Close, Search } from "@mui/icons-material";
import { ThemeContext } from "../../../Utils/themeContext.jsx";
import { getTheme } from "../../../Utils/Theme.jsx";

const SelectUsuarios = ({
  usuarios = [],
  sizeUsuarios = 10,
  pagesUsuarios = 0,
  atualizarUsuarios,
  responsavel,
  fkResponsavel,
  onChange,
  disabled,
  error,
}) => {
  const { mode } = useContext(ThemeContext);
  const theme = getTheme(mode);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(pagesUsuarios || 0);
  const [buscaTitulo, setBuscaTitulo] = useState("");
  const [onSearch, setOnSearch] = useState(false);

  const clearSearch = async () => {
    await atualizarUsuarios();
    setOnSearch(false);
    setBuscaTitulo("");
  };

  useEffect(() => {
    if (buscaTitulo.trim() !== "") {
      setOnSearch(true);
      atualizarUsuarios(0, buscaTitulo.toLowerCase());
    } else {
      clearSearch();
    }
  }, [buscaTitulo]);

  useEffect(() => {
    const fetch = async () => {
      const data = await atualizarUsuarios(page, null);
      if (data?.totalPages) setTotalPages(data.totalPages);
    };
    fetch();
  }, [page]);

  const responsavelNaoEstaNaLista =
    fkResponsavel != "#" &&
    !usuarios.find((usuario) => usuario.idUsuario == fkResponsavel);

  return (
    <Select
      value={fkResponsavel}
      onChange={onChange}
      disabled={disabled}
      fullWidth
      displayEmpty
      sx={{
        ...inputStyle?.sx,
        color: theme.palette.text.primary,
        background: theme.palette.background.paper,
      }}
      error={!!error}
      MenuProps={{
        TransitionComponent: Grow,
        PaperProps: {
          sx: {
            border: `2px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            borderRadius: 2,
            maxHeight: 450,
            display: "flex",
            flexDirection: "column",
            overflow: "visible",
          },
        },
      }}
    >

      {/* ITEM PADRÃO */}
      <MenuItem value="#">
        <Typography color={theme.palette.text.secondary}>
          Selecione o responsável
        </Typography>
      </MenuItem>

      {/* RESPONSÁVEL QUE NÃO ESTÁ NA LISTA */}
      {responsavelNaoEstaNaLista && (
        <MenuItem
          key={fkResponsavel}
          value={fkResponsavel}
          sx={{
            display: "flex",
            alignItems: "center",
            background: theme.palette.background.default,
            borderRadius: "10px",
            py: 1,
            "&:hover": { background: theme.palette.action.hover },
          }}
        >
          <Box>
            <Typography color={theme.palette.text.primary} fontWeight="bold">
              {responsavel?.nome}
            </Typography>
            <Typography color={theme.palette.text.secondary} fontSize={12}>
              {responsavel?.cargo}
            </Typography>
          </Box>
        </MenuItem>
      )}

      {/* LISTA DE USUÁRIOS */}
      {usuarios.length > 0 ? (
        usuarios.map((usuario) =>
          usuario.idUsuario == fkResponsavel && responsavelNaoEstaNaLista
            ? null
            : (
              <MenuItem
                key={usuario.idUsuario}
                value={usuario.idUsuario}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  background: theme.palette.background.default,
                  py: 1,
                  "&:hover": { background: theme.palette.action.hover },
                }}
              >
                <Box>
                  <Typography color={theme.palette.text.primary} fontWeight="bold">
                    {usuario.nome}
                  </Typography>
                  <Typography color={theme.palette.text.secondary} fontSize={12}>
                    {usuario.cargo}
                  </Typography>
                </Box>
              </MenuItem>
            )
        )
      ) : (
        <MenuItem disabled>
          <Typography
            color={theme.palette.primary.light}
            sx={{ textAlign: "center", width: "100%" }}
          >
            Nenhum usuário encontrado!
          </Typography>
        </MenuItem>
      )}

      {/* PAGINAÇÃO + SEARCH */}
      <Stack
        sx={{
          justifyContent: "center",
          background: theme.palette.background.paper,
          p: 1,
          borderTop: `1px solid ${theme.palette.divider}`
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
          sx={{ width: "100%" }}
        >
          <Pagination
            count={totalPages}
            page={page + 1}
            onClick={(e) => e.stopPropagation()}
            onChange={(e, value) => {
              e.stopPropagation();
              setPage(value - 1);
            }}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                color: theme.palette.text.primary,
              },
            }}
          />

          {/* TEXTFIELD COM LABEL TIPOGRAFADA */}
          <TextField
            value={buscaTitulo}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            onChange={(e) => setBuscaTitulo(e.target.value)}
            label={
              <Typography sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Search /> Buscar usuário...
              </Typography>
            }
            sx={{ flex: 1 }}
            autoComplete="off"
            InputLabelProps={{
              sx: {
                color: theme.palette.text.secondary,
                "&.Mui-focused": {
                  color: theme.palette.text.primary,
                },
              },
            }}
            InputProps={{
              sx: {
                color: theme.palette.text.primary,
                "&.MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.divider,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: theme.palette.primary.main,
                },
              },
            }}
          />

          <Close
            onClick={clearSearch}
            sx={{
              color: theme.palette.text.primary,
              cursor: "pointer",
              transition: "0.3s",
              border: "1px solid transparent",
              borderRadius: "4px",
              display: onSearch ? "unset" : "none",
              "&:hover": { border: `1px solid ${theme.palette.divider}` },
            }}
          />
        </Stack>
      </Stack>
    </Select>
  );
};

export default SelectUsuarios;
