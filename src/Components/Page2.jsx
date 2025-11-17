
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Modal } from "antd";
import { useState } from "react";
export const Page2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, price, category, image } = location.state;
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, price, category }),
      });
      const data = await res.json();
      message.success("Product created!");
      setOpen(false);
      navigate("/", { state: { newProduct: { ...data, thumbnail: image } } });

    } catch (err) {
      message.error("Failed to create product");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Confirm Product Details</h2>

      <Form layout="vertical">
        <Form.Item label="Product Title">
          <Input value={title} disabled />
        </Form.Item>

        <Form.Item label="Price">
          <Input value={price} disabled />
        </Form.Item>

        <Form.Item label="Category">
          <Input value={category} disabled />
        </Form.Item>

        {/* SHOW IMAGE */}
        {image && (
          <div style={{ marginTop: 20 }}>
            <p><b>Uploaded Image:</b></p>
            <img
              src={image}
              alt="uploaded"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "10px",
                objectFit: "cover",
                border: "1px solid #ccc",
                marginTop: 10
              }}
            />
          </div>
        )}
      </Form>

      <Button type="primary" onClick={() => setOpen(true)}>
        Confirm Product
      </Button>

      <Modal
        title="Confirm Submission"
        open={open}
        onOk={handleConfirm}
        onCancel={() => navigate("/")}
      >
        <p>Are you sure you want to create this product?</p>

        <ul>
          <li><b>Title:</b> {title}</li>
          <li><b>Price:</b> {price}</li>
          <li><b>Category:</b> {category}</li>
        </ul>

        {image && (
          <img
            src={image}
            alt="preview"
            style={{
              width: 120,
              height: 120,
              marginTop: 15,
              borderRadius: 10,
              objectFit: "cover"
            }}
          />
        )}
      </Modal>
    </div>
  );
};
