import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  color: #004d40;
`;

const Card = styled.div`
  position: relative;
  z-index: 1;
  background: #ebfae3ff;
  border-radius: 12px;
  padding: 40px 30px;
  max-width: 500px;
  width: 100%;
  text-align: center;
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: #004d40;
`;

const StyledLink = styled(Link)`
  padding: 0.6rem 1.8rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background: #004d40;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background: #00695c;
  }
`;

function Home() {
  return (
    <Container>
      <Card>
        <Title>🚲인천 자전거 보관소🚲</Title>
        <Subtitle>
          인천시 자전거 보관소 정보를 한눈에 확인하고 즐겨찾기를 관리하세요.
          안전하고 편리한 자전거 이용을 위해 필요한 모든 정보를 제공합니다!
        </Subtitle>
        <StyledLink to="/list">보관소 찾기</StyledLink>
      </Card>
    </Container>
  );
}

export default Home;
