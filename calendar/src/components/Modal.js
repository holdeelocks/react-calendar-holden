import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 2rem;
  font-size: 3rem;
  font-weight: bold;
  border: none;
  background-color: transparent;
  color: white;
  cursor: pointer;
  &:active,
  &:focus {
    outline: none;
  }
`;

const Modal = props => {
  return (
    <StyledModal>
      <CloseButton onClick={props.closeModal}>&times;</CloseButton>
      {props.children}
    </StyledModal>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeModal: PropTypes.func.isRequired
};

export default Modal;
