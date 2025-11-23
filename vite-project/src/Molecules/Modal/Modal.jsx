import { useRef } from "react";
import { Box, Stepper, Step, StepLabel, Dialog, Stack } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Content } from "../Mudal2/Modal.style";

const etapas = ["Enviar Código", "Validar Código", "Nova Senha"];

const Modal = ({ open, onClose, form, etapaAtual }) => {
  if (!open) return null;

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

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <Content sx={{ padding: 0 }}>
          <Box display="flex" justifyContent="flex-end" alignItems="center" padding={2}>
            <Close onClick={onClose} size="small" style={{ cursor: "pointer" }} />
          </Box>
          <Stack gap={3}>

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
            {form}
          </Stack>
        </Content>
      </Dialog>
    </>
  );
};

export default Modal;