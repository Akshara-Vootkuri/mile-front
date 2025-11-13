
import { DatePicker, Input, Table, Button, Modal, Form, message, Select } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate,useLocation } from "react-router-dom";

export const Page1 = () => {
  const today = new Date();
  const beforedays = new Date();
  const navigate=useNavigate()
  beforedays.setDate(today.getDate() - 7);
  const location = useLocation();
  const [start, setStart] = useState(beforedays);
  const [end, setEnd] = useState(today);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const HandleStart = (date) => setStart(date?date.toDate():null);
  const HandleEnd = (date) => setEnd(date?date.toDate():null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [open, setOpen] = useState(false);


  const disableStartDate = (current) => current && current > dayjs();
  const disableEndDate = (current) =>
    (current && current < dayjs(start)) || (current && current > dayjs());
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      setProducts(data.products);
    } catch (err) {
      message.error("Failed to fetch products");
    }
  };
  useEffect(()=>{
    if(location.state?.newProduct){
      setProducts((prev)=>[location.state.newProduct,...prev])
    }
  },[location.state])
  useEffect(() => {
    fetchProducts();
  }, []);
   const filteredProducts = products.filter((p) =>
    p.category.toLowerCase().includes(search.toLowerCase())
  );
  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Title", dataIndex: "title" },
    { title: "Price", dataIndex: "price" },
    { title: "Category", dataIndex: "category" },
  ];

   const HandleOk = () => {
    if (!title || !price || !category) {
      message.warning("Please fill all fields");
      return;
    }

    navigate("/page2", {
      state: { title, price, category },
    });

    setTitle("");
    setPrice("");
    setCategory("");
    setOpen(false);
  };

  return (
    <div>
      <h2>Product Dashboard</h2>

      <div>
        <div>
          <p>Start Date:</p>
          <DatePicker
            value={dayjs(start)}
            onChange={HandleStart}
            disabledDate={disableStartDate}
          />
        </div>
        <div>
          <p>End Date:</p>
          <DatePicker
            value={dayjs(end)}
            onChange={HandleEnd}
            disabledDate={disableEndDate}
          />
        </div>
      </div>

      <div >
         <Input
          placeholder="search by category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 250 }}
        />
          <Button type="primary" onClick={() => setOpen(true)}>
          + Add Product
        </Button>
        
      </div>
      <Table
        dataSource={filteredProducts}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
      <Modal title="Enter new product" open={open} onOk={HandleOk} onCancel={() => setOpen(false)}>
          <Form layout="vertical">
            <Form.Item label="Product Title" required>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter product title"
            />
            </Form.Item>
             <Form.Item label="Price" required>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter product price"
            />
            </Form.Item>

          <Form.Item label="Category" required>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter product category"
            />
          </Form.Item>

          </Form>
      </Modal>
    </div>
  );
};
