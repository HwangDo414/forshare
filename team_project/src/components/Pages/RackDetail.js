import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const RackDetail = ({ racks, onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!racks || racks.length === 0) return <div>데이터 로딩 중...</div>;

  const rack = racks.find((r) => r.id === parseInt(id) || r.id === id);

  if (!rack) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>해당 보관소를 찾을 수 없습니다.</h2>
        <Link to="/list">목록으로 돌아가기</Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까? (임시 삭제)")) {
      onDelete(rack.id);
      alert("삭제되었습니다.");
      navigate("/list");
    }
  };

  const DetailCard = {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "10px 30px 40px",
    background: "#ebfae3ff",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  };

  const InfoSection = {
    flex: 1,
    minWidth: "300px",
    lineHeight: "1.8",
  };

  const ButtonStyle = {
    padding: "8px 15px",
    marginRight: "10px",
    cursor: "pointer",
    border: "none",
    borderRadius: "4px",
    color: "white",
    fontWeight: "bold",
  };

  const {
    name,
    district,
    capacity,
    lat,
    lng,
    updatedAt,
    installationDate,
    manager,
    roadSegment,
    ftcNumber,
  } = rack;

  return (
    <div style={DetailCard}>
      <h2 style={{ color: "#004d40" }}>{name}</h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        <div style={InfoSection}>
          <p>
            <strong>📍 관리 구역:</strong> {district ?? "정보 없음"}
          </p>
          <p>
            <strong>🚲 수용 가능:</strong> {capacity ?? "정보 없음"}대
          </p>
          <p>
            <strong>📅 설치일:</strong> {installationDate ?? "정보 없음"}
          </p>
          <p>
            <strong>🔢 관리 ID:</strong> {rack.id}
          </p>
          <p>
            <strong>🛣️ 도로 구간 번호:</strong> {roadSegment ?? "정보 없음"}
          </p>
          <p>
            <strong>🗺️ 지형지물번호:</strong> {ftcNumber ?? "정보 없음"}
          </p>
          <p>
            <strong>🏢 관리기관:</strong> {manager ?? "정보 없음"}
          </p>
          <p>
            <strong>📅 정보 업데이트:</strong> {updatedAt ?? "정보 없음"}
          </p>

          <div style={{ marginTop: "30px" }}>
            <Link to={`/update/${rack.id}`}>
              <button style={{ ...ButtonStyle, backgroundColor: "#00796b" }}>
                수정 (Update)
              </button>
            </Link>
            <button
              onClick={handleDelete}
              style={{ ...ButtonStyle, backgroundColor: "#ff5252" }}
            >
              삭제 (Delete)
            </button>
          </div>
          <div style={{ marginTop: "20px" }}>
            <Link
              to="/list"
              style={{
                color: "#004d40",
                fontWeight: "bold",
                display: "inline-block",
                marginTop: "10px",
                textDecoration: "none",
              }}
            >
              목록으로 돌아가기 &gt;
            </Link>
          </div>
        </div>

        <div
          style={{
            width: "400px",
            height: "300px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          {lat != null && lng != null ? (
            <MapContainer
              center={[lat, lng]}
              zoom={16}
              style={{ width: "100%", height: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <Marker position={[lat, lng]}>
                <Popup>{name}</Popup>
              </Marker>
            </MapContainer>
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#777",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              위치 정보가 없습니다
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RackDetail;
