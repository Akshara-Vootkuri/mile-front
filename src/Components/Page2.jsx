
import styled from "styled-components";
import { Form, Input, Button, DatePicker, message } from "antd";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authHeader } from "../utils/authHeader.jsx";
import dayjs from "dayjs";
const API_BASE_URL = import.meta.env.VITE_API_URL;
const Wrapper = styled.div`
  padding: 30px;
  background: #f5f7ff;
  min-height: 100vh;
`;

export const Page2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, price, category, description, imageUrl } = location.state;

  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const productData = {
        name,
        price: Number(price),
        category,
        description: description || "No description",
        imageUrl: imageUrl || "",
        createdDate: date,
      };

      const res = await fetch(`${API_BASE_URL}/products/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...authHeader(),
        },
        body: JSON.stringify(productData),
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      message.success("Product saved!");
      navigate("/", { state: { newProduct: data } });
    } catch {
      message.error("Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      {/* Header with Logout */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Confirm Product Details</h2>
        <Button danger onClick={handleLogout}>Logout</Button>
      </div>

      <Form layout="vertical">
        <Form.Item label="Name"><Input value={name} disabled /></Form.Item>
        <Form.Item label="Price"><Input value={price} disabled /></Form.Item>
        <Form.Item label="Category"><Input value={category} disabled /></Form.Item>
        <Form.Item label="Description"><Input value={description} disabled /></Form.Item>
        <Form.Item label="Created Date">
          <DatePicker value={dayjs(date)} onChange={(d) => setDate(d.format("YYYY-MM-DD"))} />
        </Form.Item>
        <Form.Item label="Image">
          {imageUrl && <img src={imageUrl} width={150} height={150} style={{ borderRadius: 10 }} />}
        </Form.Item>
      </Form>

      <Button type="primary" onClick={handleConfirm} loading={loading}>
        Confirm & Save
      </Button>
      <Button style={{ marginLeft: 10 }} onClick={() => navigate(-1)}>
        Cancel
      </Button>
    </Wrapper>
  );
};
