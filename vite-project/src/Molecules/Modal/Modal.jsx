import { useRef } from "react";
import React from "react";
import './Modal.css';

const Modal = ({ showModal, fechar, form }) => {
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
        <div className="modal">
            <div className="modal-content" ref={modalRef}>
                <div className="modal-header" onMouseDown={handleDragStart}>
                    <div className="header-box"></div>
                </div>

                <span className="close" onClick={fechar}>&times;</span>
                {form}
            </div>
        </div>
    );
};

export default Modal;
