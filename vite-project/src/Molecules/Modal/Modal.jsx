import { useRef } from "react";
import { Box, Zoom, Stepper, Step, StepLabel, useTheme } from "@mui/material";
import { Close, Check, Block } from "@mui/icons-material";

import { Backdrop, ModalContent, DragHandle } from "./Modal.styles";
import { useWarningValidator } from "../../Utils/useWarning";

const etapas = ["Enviar Código", "Validar Código", "Nova Senha"];

const Modal = ({ showModal, fechar, form, acao, entidade, etapaAtual }) => {
  if (!showModal) return null;

  const modalRef = useRef(null);
  const theme = useTheme(); // ✅ TEMA APLICADO AQUI

  const handleDragStart = (e) => {
    const modalElement = modalRef.current;
    const offsetX = e.clientX - modalElement.getBoundingClientRect().left;
    const offsetY = e.clientY - modalElement.getBoundingClientRect().top;

    const handleMouseMove = (e) => {
      modalElement.style.left = `${e.clientX - offsetX}px`;
      modalElement.style.top = `${e.clientY - offsetY}px`;
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <Zoom in={showModal}>
      <Backdrop>
        <ModalContent
          ref={modalRef}
          sx={{
            width: `${acao === "aumentar" ? "950px" : acao === "aumentar1" ? "600px" : "450px"}`,
            backgroundColor: theme.palette.background.paper // ✅ antes implícito
          }}
        >
          <DragHandle
            onMouseDown={handleDragStart}
            sx={{
              backgroundColor: theme.palette.divider // ✅ tema
            }}
          />

          <Box
            display="flex"
            justifyContent={
              useWarningValidator(entidade || null) !== null
                ? "space-between"
                : "flex-end"
            }
            alignItems="center"
          >
            {useWarningValidator(entidade)}

            <Close
              onClick={fechar}
              size="small"
              style={{ cursor: "pointer" }}
              sx={{
                color: theme.palette.text.primary // ✅ tema no ícone
              }}
            />
          </Box>

          {entidade == 'esqueciASenha' && (
            <Box my={4}>
              <Stepper activeStep={etapaAtual} alternativeLabel>
                {etapas.map((label, index) => (
                  <Step key={label}>
                    <StepLabel
                      sx={{
                        color: theme.palette.text.secondary, // ✅ tema padrão
                        ...(index === etapaAtual && {
                          color: theme.palette.primary.main,
                          '& .MuiStepLabel-label': {
                            color: theme.palette.primary.main,
                            fontWeight: 'bold'
                          }
                        })
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          )}

          {form}
        </ModalContent>
      </Backdrop>
    </Zoom>
  );
};

export default Modal;
