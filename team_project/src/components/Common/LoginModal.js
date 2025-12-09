import React, { useState } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: #ebfae3ff;
  padding: 2rem 2.5rem;
  border-radius: 15px;
  width: 350px;
  max-width: 90%;
  box-shadow: 0 8px 25px rgba(0,0,0,0.3);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const Title = styled.h3`
  text-align: center;
  color: #004d40;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.7rem 0.8rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  outline: none;
  transition: all 0.2s;
  
  &:focus {
    border-color: #004d40;
    box-shadow: 0 0 5px rgba(0,77,64,0.4);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Button = styled.button`
  flex: 1;
  padding: 0.7rem 0;
  background: #004d40;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #00796b;
    transform: translateY(-2px);
  }
`;

function LoginModal({ onLogin, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!username || !password) {
      alert("아이디와 비밀번호를 입력해주세요!");
      return;
    }
    onLogin(username);
  };

  return (
    <Overlay>
      <Modal>
        <Title>로그인</Title>
        <Input
          type="text"
          placeholder="아이디"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <ButtonGroup>
          <Button onClick={handleSubmit}>로그인</Button>
          <Button onClick={onClose}>취소</Button>
        </ButtonGroup>
      </Modal>
    </Overlay>
  );
}

export default LoginModal;
