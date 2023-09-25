import React from 'react';
import styled from 'styled-components';

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Darker shadow */
  padding: 50px;
  z-index: 1000;
  text-align: center;
  border-radius: 5px;
`;

const Message = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
  padding-right: 20px;
  color: #fff;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: full;
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

const Popup = ({ setShowPopup,  }) => {
  return (
    <PopupContainer>
      <Message>Do you want to logout?</Message>
      <ButtonContainer>
        <Button>Yes</Button>
        <Button onClick={setShowPopup(false)}>No</Button>
      </ButtonContainer>
    </PopupContainer>
  );
};

export default Popup;
