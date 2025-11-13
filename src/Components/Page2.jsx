import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Modal } from "antd";
import { useState } from "react";
export const Page2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {title, price, category} = location.state;
  const [open, setOpen] = useState(false);

  const handleConfirm = async() => {
    try {
      const res = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, price, category }),
      });
      const data = await res.json();
      message.success("Product created!");
      console.log("Created product:", data);
      setOpen(false);
      navigate("/",{state:{newProduct:data}});
    } catch (err) {
      message.error("Failed to create product");
    }
  };

  return (
    <div>
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
      </Modal>
    </div>
  );
};
