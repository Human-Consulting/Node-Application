import { useRef } from "react";
import { Box, Zoom, Stepper, Step, StepLabel } from "@mui/material";
import { Close, Check, Block } from "@mui/icons-material";

import { Backdrop, ModalContent, DragHandle } from "./Modal.styles";
import { useWarningValidator } from "../../Utils/useWarning";

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
      const {componente} = useWarningValidator(entidade?.comImpedimento, entidade?.dtFim)
  

  return (
    <Zoom in={showModal}>
      <Backdrop>
        <ModalContent ref={modalRef} sx={{ width: `${acao === "aumentar" ? "950px" : acao === "aumentar1" ? "600px" : "450px"}` }}>
          <DragHandle onMouseDown={handleDragStart} />
          <Box display="flex" justifyContent={componente ? "space-between" : "flex-end"} alignItems="center">
            {componente}
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
