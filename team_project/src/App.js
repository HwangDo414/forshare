import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

// Pages
import Home from "./components/Pages/Home";
import RackList from "./components/Pages/RackList";
import RackDetail from "./components/Pages/RackDetail";
import RackForm from "./components/Pages/RackForm";
import MyPage from "./components/Pages/MyPage";

// Common
import LoginModal from "./components/Common/LoginModal";

// 배경 이미지 import
import incheonBg from "./assets/incheon.jpg";

const Background = styled.div`
  min-height: 100vh;
  background-image: url(${incheonBg});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
`;

const Nav = styled.nav`
  background: #004d40;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  font-weight: bold;

  a {
    color: white;
    text-decoration: none;
    font-size: 1rem;
    font-weight: bold;
    margin-right: 20px;
    transition: color 0.3s;
    &:hover {
      color: #a7ffeb;
    }
  }
`;

const NavButtonGroup = styled.div`
  margin-left: auto;
  display: flex;
  gap: 15px;

  button {
    font-size: 1rem;
    font-weight: bold;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: #a7ffeb;
    }
  }
`;

const LoginRequiredCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px auto 0 auto;
  padding: 40px;
  max-width: 400px;
  background: #ebfae3ff;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;

  h2 {
    color: #00695c;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 30px;
    color: #004d40;
  }

  button {
    padding: 10px 25px;
    font-size: 1rem;
    font-weight: bold;
    color: white;
    background: #004d40;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #00695c;
    }
  }
`;

function App() {
  const [racks, setRacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const districtMap = {
    28177: "연수구",
    28185: "남동구",
    28200: "부평구",
    28237: "계양구",
    28245: "서구",
    28260: "강화군",
    28710: "옹진군",
    28110: "중구",
    28140: "동구",
    28170: "미추홀구",
  };

  useEffect(() => {
    const fetchUrl =
      "https://smart.incheon.go.kr/server/rest/services/Hosted/%EC%98%A4%ED%94%88%EB%8D%B0%EC%9D%B4%ED%84%B0_%EA%B5%90%ED%86%B5%EC%8B%9C%EC%84%A4%EB%AC%BC_%EC%A0%95%EB%B3%B4_%EC%9E%90%EC%A0%84%EA%B1%B0%EB%B3%B4%EA%B4%80%EC%86%8C/FeatureServer/26/query?outFields=*&where=1%3D1&f=geojson";

    axios
      .get(fetchUrl)
      .then((res) => {
        if (!res.data.features) throw new Error("데이터 구조 오류");

        const formattedData = res.data.features.map((feature) => {
          const p = feature.properties;
          const guCode = p.gucd || "";
          return {
            id: feature.id,
            name: `자전거 보관소 ${feature.id}`,
            district: districtMap[guCode] || `구역(${guCode})`,
            lat:
              feature.geometry?.coordinates?.[1] != null
                ? parseFloat(feature.geometry.coordinates[1].toFixed(13))
                : null,
            lng:
              feature.geometry?.coordinates?.[0] != null
                ? parseFloat(feature.geometry.coordinates[0].toFixed(12))
                : null,
            capacity: p.sto_cnt ?? 0,
            updatedAt: p.update_ymd
              ? new Date(p.update_ymd).toLocaleDateString()
              : "",
            installationDate: p.ist_ymd
              ? new Date(p.ist_ymd).toLocaleDateString()
              : "",
            manager: p.mngt ?? "",
            roadSegment: p.ridn ?? "",
            ftcNumber: p.ftc ?? "",
          };
        });

        setRacks(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError("데이터를 불러오지 못했습니다.");
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // CRUD
  const handleCreateRack = (newItem) =>
    setRacks((prev) => [{ ...newItem, id: Date.now() }, ...prev]);
  const handleUpdateRack = (id, updatedItem) =>
    setRacks((prev) =>
      prev.map((item) =>
        item.id === parseInt(id) ? { ...updatedItem, id: parseInt(id) } : item
      )
    );
  const handleDeleteRack = (id) => {
    setRacks((prev) => prev.filter((item) => item.id !== parseInt(id)));
    setFavorites((prev) => prev.filter((fav) => fav.rackId !== parseInt(id)));
  };

  const addFavorite = (rackId) => {
    if (favorites.some((fav) => fav.rackId === rackId)) return;
    setFavorites([...favorites, { rackId, memo: "" }]);
    alert("즐겨찾기에 추가되었습니다!");
  };
  const removeFavorite = (rackId) =>
    setFavorites(favorites.filter((fav) => fav.rackId !== rackId));
  const updateFavoriteMemo = (rackId, newMemo) =>
    setFavorites(
      favorites.map((fav) =>
        fav.rackId === rackId ? { ...fav, memo: newMemo } : fav
      )
    );

  const handleLogin = (username) => {
    setUser({ name: username });
    setShowLoginModal(false);
  };
  const handleLogout = () => setUser(null);

  return (
    <Background>
      <BrowserRouter>
        <Nav>
          <Link to="/">🚲인천 자전거</Link>
          <Link to="/list">보관소 찾기</Link>
          <Link to="/my">마이페이지</Link>

          <NavButtonGroup>
            {user ? (
              <button onClick={handleLogout}>로그아웃</button>
            ) : (
              <button onClick={() => setShowLoginModal(true)}>로그인</button>
            )}
          </NavButtonGroup>
        </Nav>

        {showLoginModal && (
          <LoginModal
            onLogin={handleLogin}
            onClose={() => setShowLoginModal(false)}
          />
        )}

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
          {loading && (
            <h3 style={{ textAlign: "center" }}>데이터 로딩 중... 🚲</h3>
          )}
          {error && (
            <h3 style={{ color: "red", textAlign: "center" }}>{error}</h3>
          )}

          {!loading && !error && (
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/list"
                element={
                  <RackList
                    racks={racks}
                    favorites={favorites}
                    addFavorite={addFavorite}
                    removeFavorite={removeFavorite}
                    user={user}
                  />
                }
              />
              <Route
                path="/detail/:id"
                element={
                  <RackDetail
                    racks={racks}
                    onDelete={handleDeleteRack}
                    favorites={favorites}
                    addFavorite={addFavorite}
                    removeFavorite={removeFavorite}
                    user={user}
                  />
                }
              />
              <Route
                path="/create"
                element={<RackForm racks={racks} onCreate={handleCreateRack} />}
              />
              <Route
                path="/update/:id"
                element={<RackForm racks={racks} onUpdate={handleUpdateRack} />}
              />
              <Route
                path="/my"
                element={
                  user ? (
                    <MyPage
                      user={user}
                      racks={racks}
                      favorites={favorites}
                      removeFavorite={removeFavorite}
                      updateFavoriteMemo={updateFavoriteMemo}
                    />
                  ) : (
                    <LoginRequiredCard>
                      <h2>로그인이 필요합니다</h2>
                      <p>마이페이지를 이용하려면 로그인이 필요합니다.</p>
                      <button onClick={() => setShowLoginModal(true)}>
                        로그인
                      </button>
                    </LoginRequiredCard>
                  )
                }
              />
            </Routes>
          )}
        </div>
      </BrowserRouter>
    </Background>
  );
}

export default App;
