// RackForm.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RackForm = ({ racks, onCreate, onUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    district: "",
    capacity: 0,
    lat: null,
    lng: null,
    manager: "",
    roadSegment: "",
    ftcNumber: "",
    installationDate: "",
  });

  useEffect(() => {
    if (id && racks) {
      const target = racks.find((r) => r.id === parseInt(id) || r.id === id);
      if (target) {
        setFormData({
          name: target.name ?? "",
          district: target.district ?? "",
          capacity: target.capacity ?? 0,
          lat: target.lat ?? null,
          lng: target.lng ?? null,
          manager: target.manager ?? "",
          roadSegment: target.roadSegment ?? "",
          ftcNumber: target.ftcNumber ?? "",
          installationDate: target.installationDate
            ? new Date(target.installationDate).toISOString().split("T")[0]
            : "",
        });
      }
    }
  }, [id, racks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "capacity" || name === "lat" || name === "lng"
          ? parseFloat(value) || 0
          : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      updatedAt: new Date().toISOString().split("T")[0],
    };

    if (id) {
      onUpdate(id, payload);
      alert("수정되었습니다!");
      navigate(`/detail/${id}`);
    } else {
      onCreate({ ...payload, id: Date.now() });
      alert("등록되었습니다!");
      navigate("/list");
    }
  };

  const FormCard = {
    maxWidth: "600px",
    margin: "40px auto",
    padding: "20px 30px 30px",
    background: "#ebfae3ff",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  };

  const InputStyle = {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const LabelStyle = {
    fontWeight: "bold",
    marginBottom: "5px",
    display: "block",
  };

  return (
    <div style={FormCard}>
      <h2 style={{ color: "#004d40", marginBottom: "20px" }}>
        {id ? "보관소 정보 수정" : "새 보관소 등록"}
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label style={LabelStyle}>보관소 이름</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={InputStyle}
          />
        </div>

        <div>
          <label style={LabelStyle}>구역 (District)</label>
          <input
            name="district"
            value={formData.district}
            onChange={handleChange}
            required
            style={InputStyle}
          />
        </div>

        <div>
          <label style={LabelStyle}>수용량</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            style={InputStyle}
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <label style={LabelStyle}>위도 (Lat)</label>
            <input
              type="number"
              step="any"
              name="lat"
              value={formData.lat ?? ""}
              onChange={handleChange}
              style={InputStyle}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={LabelStyle}>경도 (Lng)</label>
            <input
              type="number"
              step="any"
              name="lng"
              value={formData.lng ?? ""}
              onChange={handleChange}
              style={InputStyle}
            />
          </div>
        </div>

        <div>
          <label style={LabelStyle}>관리 기관</label>
          <input
            name="manager"
            value={formData.manager}
            onChange={handleChange}
            style={InputStyle}
          />
        </div>

        <div>
          <label style={LabelStyle}>도로 구간</label>
          <input
            name="roadSegment"
            value={formData.roadSegment}
            onChange={handleChange}
            style={InputStyle}
          />
        </div>

        <div>
          <label style={LabelStyle}>지형지물 번호</label>
          <input
            name="ftcNumber"
            value={formData.ftcNumber}
            onChange={handleChange}
            style={InputStyle}
          />
        </div>

        <div>
          <label style={LabelStyle}>설치일</label>
          <input
            type="date"
            name="installationDate"
            value={formData.installationDate}
            onChange={handleChange}
            style={InputStyle}
          />
        </div>

        <button
          type="submit"
          style={{
            marginTop: "20px",
            padding: "12px",
            backgroundColor: "#004d40",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          {id ? "수정 완료" : "등록하기"}
        </button>
      </form>
    </div>
  );
};

export default RackForm;
