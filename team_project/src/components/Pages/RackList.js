import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ListWrapper = styled.div`
  background: #ebfae3ff; // 전체 흰 배경
  padding: 20px;
  border-radius: 10px;
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  position: relative;
  background: #ffffff; // 카드도 흰색
  &:hover {
    transform: translateY(-5px);
  }
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  select,
  input,
  button {
    font-size: 1rem;
  }

  select,
  input {
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  button {
    padding: 10px 20px;
    background-color: #004d40;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    height: 100%;
    transition: background 0.3s;

    &:hover {
      background-color: #00695c;
    }
  }

  input {
    flex: 1;
  }
`;

const RackList = ({ racks, favorites, addFavorite, removeFavorite }) => {
  const [search, setSearch] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("전체");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 50;

  const districtOptions = useMemo(() => {
    if (!racks) return ["전체"];
    const allDistricts = racks.map((r) => r.district).filter(Boolean);
    return [
      "전체",
      ...Array.from(new Set(allDistricts)).sort((a, b) => a.localeCompare(b, "ko")),
    ];
  }, [racks]);

  if (!racks) return <div>데이터를 불러오는 중입니다...</div>;

  const filtered = racks.filter((r) => {
    const nameMatch = r.name && r.name.includes(search);
    const districtMatch = r.district && r.district.includes(search);
    const searchCondition = nameMatch || districtMatch;

    const districtFilterCondition =
      selectedDistrict === "전체" ||
      (r.district && r.district.includes(selectedDistrict));

    return searchCondition && districtFilterCondition;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ListWrapper>
      <h2>📍 인천 자전거 보관소 목록</h2>

      <FilterWrapper>
        <select
          value={selectedDistrict}
          onChange={(e) => {
            setSelectedDistrict(e.target.value);
            setCurrentPage(1);
          }}
        >
          {districtOptions.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="검색어 입력..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <Link to="/create">
          <button>+ 등록</button>
        </Link>
      </FilterWrapper>

      <p>
        총 <strong>{filtered.length}</strong>개의 보관소가 검색되었습니다. (현재
        필터: {selectedDistrict})
      </p>

      <ListGrid>
        {paginated.map((rack) => {
          const isFav = favorites.some((fav) => fav.rackId === rack.id);

          return (
            <Card key={rack.id}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "start",
                }}
              >
                <h3 style={{ margin: "0 0 10px 0", fontSize: "1.1rem" }}>
                  {rack.name}
                </h3>

                <button
                  onClick={() =>
                    isFav ? removeFavorite(rack.id) : addFavorite(rack.id)
                  }
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                  }}
                >
                  {isFav ? "❤️" : "🤍"}
                </button>
              </div>

              <p style={{ margin: "5px 0", color: "#555" }}>📍 {rack.district}</p>
              <p style={{ margin: "5px 0", color: "#555" }}>
                🚲 수용: {rack.capacity}대
              </p>

              <Link
                to={`/detail/${rack.id}`}
                style={{
                  color: "#004d40",
                  fontWeight: "bold",
                  display: "inline-block",
                  marginTop: "10px",
                  textDecoration: "none",
                }}
              >
                상세보기 &gt;
              </Link>
            </Card>
          );
        })}
      </ListGrid>

      {totalPages > 1 && (
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            style={{
              padding: "8px 12px",
              borderRadius: "5px",
              border: "1px solid #004d40",
              background: currentPage === 1 ? "#ccc" : "#004d40",
              color: currentPage === 1 ? "#666" : "#fff",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            &lt; 이전
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              style={{
                padding: "8px 12px",
                borderRadius: "5px",
                border: "1px solid #004d40",
                background: currentPage === num ? "#004d40" : "#fff",
                color: currentPage === num ? "#fff" : "#004d40",
                cursor: "pointer",
              }}
            >
              {num}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            style={{
              padding: "8px 12px",
              borderRadius: "5px",
              border: "1px solid #004d40",
              background: currentPage === totalPages ? "#ccc" : "#004d40",
              color: currentPage === totalPages ? "#666" : "#fff",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            다음 &gt;
          </button>
        </div>
      )}
    </ListWrapper>
  );
};

export default RackList;
