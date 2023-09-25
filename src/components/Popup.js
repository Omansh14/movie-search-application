import React from 'react';
import styled from 'styled-components';

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Darker shadow */
  padding: 20px;
  z-index: 1000;
  text-align: center;
  border-radius: 5px;
`;

const Message = styled.p`
  font-size: 18px;
  margin-bottom: 20px;
  color: gray;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #2563eb;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin: 0 10px;
`;

const Popup = ({ onClose, onConfirm }) => {
  return (
    <PopupContainer>
      <Message>Do you want to logout?</Message>
      <ButtonContainer>
        <Button onClick={onConfirm}>Yes</Button>
        <Button onClick={onClose}>No</Button>
      </ButtonContainer>
    </PopupContainer>
  );
};

export default Popup;
