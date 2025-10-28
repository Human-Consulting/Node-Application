import { useRef } from "react";
import { Box, Zoom, Stepper, Step, StepLabel } from "@mui/material";
import { Close, Check, Block } from "@mui/icons-material";

import { Backdrop, ModalContent, DragHandle } from "./Modal.styles";

const etapas = ["Enviar Código", "Validar Código", "Nova Senha"];

const Modal = ({ showModal, fechar, form, acao, entidade, etapaAtual }) => {
  if (!showModal) return null;

  const modalRef = useRef(null);

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

  const renderIconeStatus = () => {
    if (entidade?.progresso == 100) {
      return (
        <Check sx={{ border: "solid #2196f3 3px", borderRadius: "50%" }} size="small" />
      );
    }

    if (entidade?.comImpedimento && entidade?.progresso < 50) {
      return (
        <Block sx={{ border: "solid #F44336 2px", borderRadius: "50%" }} size="small" />
      );
    }

    if (entidade?.comImpedimento) {
      return (
        <Block sx={{ border: "solid orange 2px", borderRadius: "50%" }} size="small" />
      );
    }
    return null;
  };

  return (
    <Zoom in={showModal}>
      <Backdrop>
        <ModalContent ref={modalRef} sx={{ width: `${acao === "aumentar" ? "950px" : acao === "aumentar1" ? "600px" : "450px"}` }}>
          <DragHandle onMouseDown={handleDragStart} />
          <Box display="flex" justifyContent={renderIconeStatus() !== null ? "space-between" : "flex-end"} alignItems="center">
            {renderIconeStatus()}
            <Close onClick={fechar} size="small" style={{ cursor: "pointer" }} />
          </Box>

          {entidade == 'esqueciASenha' && (

            <Box my={4}>
              <Stepper activeStep={etapaAtual} alternativeLabel>
                {etapas.map((label, index) => (
                  <Step key={label}>
                    <StepLabel
                      sx={{
                        ...(index === etapaAtual && {
                          color: 'primary.main',
                          '& .MuiStepLabel-label': {
                            color: 'primary.main',
                            fontWeight: 'bold'
                          }
                        })
                      }}
                    >{label}</StepLabel>
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
