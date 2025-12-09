import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

// ================= styled-components =================
const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 40px 20px;
  background-color: #ebfae3ff;
  border-radius: 12px;
`;

const ProfileCard = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 30px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  font-size: 25px;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  background-color: #004d40;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
`;

const Section = styled.div`
  margin-top: 30px;
  h3 {
    border-bottom: 2px solid #004d40;
    padding-bottom: 10px;
    display: inline-block;
  }
`;

const FavList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FavItem = styled.li`
  background: white;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MemoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MemoInput = styled.input`
  flex: 1;
  padding: 12px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
`;

// ================= MyPage Component =================
const MyPage = ({ favorites = [], racks = [], removeFavorite, updateFavoriteMemo, user }) => {
  const myFavorites = favorites
    .map((fav) => {
      const rack = racks.find((r) => r.id === fav.rackId);
      return {
        ...fav,
        rackInfo: rack,
      };
    })
    .filter((item) => item.rackInfo);

  return (
    <Container>
      <ProfileCard>
        <Avatar>{user?.name?.[0]?.toUpperCase() || "U"}</Avatar>
        <div>
          <h2 style={{ margin: "0 0 10px 0" }}>{user?.name || "사용자"}</h2>
        </div>
      </ProfileCard>

      <Section>
        <h3>즐겨찾기 목록 ({myFavorites.length})</h3>

        {myFavorites.length === 0 ? (
          <p style={{ marginTop: "20px", color: "#888" }}>
            즐겨찾기한 보관소가 없습니다. 리스트에서 ❤️를 눌러보세요!
          </p>
        ) : (
          <FavList>
            {myFavorites.map((item) => (
              <FavItem key={item.rackId}>
                <HeaderRow>
                  <div>
                    <Link
                      to={`/detail/${item.rackId}`}
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                        color: "#004d40",
                        textDecoration: "none",
                      }}
                    >
                      {item.rackInfo.name}
                    </Link>
                    <span
                      style={{
                        fontSize: "0.9rem",
                        color: "#666",
                        marginLeft: "10px",
                      }}
                    >
                      ({item.rackInfo.district})
                    </span>
                  </div>
                  <button
                    onClick={() => removeFavorite(item.rackId)}
                    style={{
                      background: "#ff5252",
                      color: "white",
                      border: "none",
                      padding: "6px 12px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    삭제
                  </button>
                </HeaderRow>

                <MemoWrapper>
                  <span style={{ fontSize: "0.9rem", fontWeight: "bold" }}>메모:</span>
                  <MemoInput
                    type="text"
                    placeholder="여기에 메모를 입력하세요 (예: 출근길 이용)"
                    value={item.memo}
                    onChange={(e) => updateFavoriteMemo(item.rackId, e.target.value)}
                  />
                </MemoWrapper>
              </FavItem>
            ))}
          </FavList>
        )}
      </Section>
    </Container>
  );
};

export default MyPage;
