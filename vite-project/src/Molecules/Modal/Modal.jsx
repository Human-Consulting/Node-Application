import { useRef } from "react";
import React from "react";
import { Box, Zoom } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import { Backdrop, ModalContent, DragHandle } from "./Modal.styles";

const Modal = ({ showModal, fechar, form, acao }) => {
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

    return (
        <Zoom in={showModal} >
            <Backdrop>
                <ModalContent ref={modalRef} sx={{ width: `${acao == 'task' ? '950px' : '450px'}` }}>
                    <DragHandle onMouseDown={handleDragStart} />
                    <Box display="flex" justifyContent="flex-end">
                        <IconButton onClick={fechar} size="small">
                            <CloseIcon style={{ color: '#fff' }} />
                        </IconButton>
                    </Box>
                    {form}
                </ModalContent>
            </Backdrop>
        </Zoom >
    );
};

export default Modal;
