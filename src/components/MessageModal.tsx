import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { FiX } from "react-icons/fi";

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 500px;
  height: 300px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ModalCloseButton = styled.button`
  border: none;
  background: none;
  font-size: 24px;
  cursor: pointer;
  outline: none;
`;

const ModalBody = styled.div`
  margin-top: 16px;
`;

interface MessageModalProps {
    isOpen: boolean;
    message: string;
    onClose: () => void;
  }
  
const MessageModal: React.FC<MessageModalProps> = ({
    isOpen,
    message,
    onClose,
}) => {
  return isOpen ? (
    <ModalContainer>
      <ModalHeader>
        <ModalCloseButton onClick={onClose}>
          <FiX />
        </ModalCloseButton>
      </ModalHeader>
      <ModalBody>{message}</ModalBody>
    </ModalContainer>
  ) : null;
}

export default MessageModal;