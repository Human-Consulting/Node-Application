import { useRef } from "react";
import type { MouseEvent, ReactNode } from "react";
import { Box, Stepper, Step, StepLabel, Dialog, Stack } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Content } from "../Mudal2/Modal.style";

const etapas = ["Enviar Código", "Validar Código", "Nova Senha"];

interface ModalProps {
  open: boolean;
  onClose: () => void;
  form: ReactNode;
  etapaAtual: number;
}

const Modal = ({ open, onClose, form, etapaAtual }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  if (!open) return null;

  const handleDragStart = (e: MouseEvent<HTMLElement>) => {
    const modalElement = modalRef.current;
    if (!modalElement) return;
    const offsetX = e.clientX - modalElement.getBoundingClientRect().left;
    const offsetY = e.clientY - modalElement.getBoundingClientRect().top;

    const handleMouseMove = (e: globalThis.MouseEvent) => {
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

  // Retained for future drag-to-move support; not wired to a handle yet.
  void handleDragStart;

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <Content sx={{ padding: 0 }}>
          <Box display="flex" justifyContent="flex-end" alignItems="center" padding={2}>
            <Close onClick={onClose} fontSize="small" style={{ cursor: "pointer" }} />
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
