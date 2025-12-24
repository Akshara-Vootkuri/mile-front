
// import styled from "styled-components";
// import { DatePicker, Input, Table, Button, Modal, Form, message, Select } from "antd";
// import { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import { useNavigate, useLocation } from "react-router-dom";
// import { authHeader } from "../utils/authHeader.jsx";
// import LogoutButton from "./components/LogoutButton";

// const Wrapper = styled.div`
//   padding: 30px;
//   background: #f5f7ff;
//   min-height: 100vh;
// `

// export const Page1 = () => {
//   const today = new Date();
//   const beforedays = new Date();
//   beforedays.setDate(today.getDate() - 7);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const [start, setStart] = useState(beforedays);
//   const [end, setEnd] = useState(today);

//   const [products, setProducts] = useState([]);
//   const [search, setSearch] = useState("");

//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [description, setDescription] = useState("");
//   const [imageUrl, setImageUrl] = useState("");

//   const [open, setOpen] = useState(false);

//   const HandleStart = (date) => setStart(date ? date.toDate() : null);
//   const HandleEnd = (date) => setEnd(date ? date.toDate() : null);

//   useEffect(() => {
//   if (!localStorage.getItem("token")) {
//     navigate("/login");
//   }
// }, []);
//   const fetchProducts = async () => {
//     try {
//       // const res = await fetch(
//       //   `http://localhost:8082/products?search=${search}&startDate=${dayjs(start).format(
//       //     "YYYY-MM-DD"
//       //   )}&endDate=${dayjs(end).format("YYYY-MM-DD")}`
//       // );
//       const res = await fetch(
//   `http://localhost:8082/products?search=${search}&startDate=${dayjs(start).format(
//     "YYYY-MM-DD"
//   )}&endDate=${dayjs(end).format("YYYY-MM-DD")}`,
//   {
//     headers: {
//       ...authHeader(),
//     },
//   }
// );
//       const data = await res.json();
//       setProducts(data);
//     } catch (err) {
//       message.error("Backend not responding");
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [search, start, end]);

//   useEffect(() => {
//     if (location.state?.newProduct) {
//       setProducts((prev) => [location.state.newProduct, ...prev]);
//     }
//   }, [location.state]);

//   const columns = [
//     { title: "ID", dataIndex: "id" },
//     { title: "Name", dataIndex: "name" },
//     { title: "Price", dataIndex: "price" },
//     { title: "Category", dataIndex: "category" },
//     {
//       title: "Image",
//       dataIndex: "imageUrl",
//       render: (img) => img && <img src={img} width={100} height={100} style={{ borderRadius: 8 }} />,
//     },
//     { title: "Created Date", dataIndex: "createdDate" },
//   ];

//   const HandleOk = () => {
//     if (!name || !price || !category) return message.warning("Fill all fields");

//     navigate("/page2", {
//       state: { name, price, category, description, imageUrl },
//     });

//     setOpen(false);
//     setName("");
//     setPrice("");
//     setCategory("");
//     setDescription("");
//     setImageUrl("");
//   };

//   return (
//     <Wrapper>
//       <h2>Product Dashboard</h2>

 
//       <div style={{ display: "flex", gap: 20 }}>
//         <DatePicker value={dayjs(start)} onChange={HandleStart} />
//         <DatePicker value={dayjs(end)} onChange={HandleEnd} />
//       </div>


//       <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between" }}>

//         <Select
//           value={search}
//           onChange={(value) => setSearch(value)}
//           placeholder="search category"
//           allowClear
//           style={{ width: 250 }}
//         >
//           <Select.Option value="">All</Select.Option>
//           <Select.Option value="Electronics">Electronics</Select.Option>
//           <Select.Option value="Clothing">Clothing</Select.Option>
//           <Select.Option value="Furniture">Furniture</Select.Option>
//           <Select.Option value="Grocery">Grocery</Select.Option>
//           <Select.Option value="Beauty">Beauty</Select.Option>
//         </Select>

//         <Button type="primary" onClick={() => setOpen(true)}>
//           + Add Product
//         </Button>
//       </div>

//       <Table dataSource={products} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} style={{ marginTop: 20 }} />


//       <Modal title="Enter product" open={open} onOk={HandleOk} onCancel={() => setOpen(false)}>
//         <Form layout="vertical">
//           <Form.Item label="Name" required>
//             <Input value={name} onChange={(e) => setName(e.target.value)} />
//           </Form.Item>
//           <Form.Item label="Price" required>
//             <Input value={price} onChange={(e) => setPrice(e.target.value)} />
//           </Form.Item>
//           <Form.Item label="Category" required>
//             <Input value={category} onChange={(e) => setCategory(e.target.value)} />
//           </Form.Item>
//           <Form.Item label="Description">
//             <Input value={description} onChange={(e) => setDescription(e.target.value)} />
//           </Form.Item>

         
//           <Form.Item label="Image URL">
//             <Input
//               placeholder="Enter image URL"
//               value={imageUrl}
//               onChange={(e) => setImageUrl(e.target.value)}
//             />
//             {imageUrl && (
//               <img
//                 src={imageUrl}
//                 width={120}
//                 height={120}
//                 style={{ marginTop: 10, borderRadius: 10 }}
//                 alt="preview"
//               />
//             )}
//           </Form.Item>
//         </Form>
//       </Modal>
//     </Wrapper>
//   );
// };
import styled from "styled-components";
import { DatePicker, Input, Table, Button, Modal, Form, message, Select } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate, useLocation } from "react-router-dom";
import { authHeader } from "../utils/authHeader.jsx";

const Wrapper = styled.div`
  padding: 30px;
  background: #f5f7ff;
  min-height: 100vh;
`;

export const Page1 = () => {
  const today = new Date();
  const beforedays = new Date();
  beforedays.setDate(today.getDate() - 7);

  const navigate = useNavigate();
  const location = useLocation();

  const [start, setStart] = useState(beforedays);
  const [end, setEnd] = useState(today);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [open, setOpen] = useState(false);


  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const HandleStart = (date) => setStart(date ? date.toDate() : null);
  const HandleEnd = (date) => setEnd(date ? date.toDate() : null);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `https://web-production-ae16.up.railway.app/products?search=${search}&startDate=${dayjs(start).format(
    "YYYY-MM-DD"
        )}&endDate=${dayjs(end).format("YYYY-MM-DD")}`,
        { headers: authHeader() }
      );

      if (res.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      const data = await res.json();
      setProducts(data);
    } catch {
      message.error("Backend not responding");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, start, end]);

  useEffect(() => {
    if (location.state?.newProduct) {
      setProducts((prev) => [location.state.newProduct, ...prev]);
    }
  }, [location.state]);

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Name", dataIndex: "name" },
    { title: "Price", dataIndex: "price" },
    { title: "Category", dataIndex: "category" },
    {
      title: "Image",
      dataIndex: "imageUrl",
      render: (img) =>
        img && <img src={img} width={100} height={100} style={{ borderRadius: 8 }} />,
    },
    { title: "Created Date", dataIndex: "createdDate" },
  ];

  const HandleOk = () => {
    if (!name || !price || !category) return message.warning("Fill all fields");

    navigate("/page2", {
      state: { name, price, category, description, imageUrl },
    });

    setOpen(false);
    setName("");
    setPrice("");
    setCategory("");
    setDescription("");
    setImageUrl("");
  };

  return (
    <Wrapper>
      {/* Header with Logout */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Product Dashboard</h2>
        <Button danger onClick={handleLogout}>Logout</Button>
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        <DatePicker value={dayjs(start)} onChange={HandleStart} />
        <DatePicker value={dayjs(end)} onChange={HandleEnd} />
      </div>

      <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between" }}>
        <Select
          value={search}
          onChange={(value) => setSearch(value)}
          placeholder="Search category"
          allowClear
          style={{ width: 250 }}
        >
          <Select.Option value="">All</Select.Option>
          <Select.Option value="Electronics">Electronics</Select.Option>
          <Select.Option value="Clothing">Clothing</Select.Option>
          <Select.Option value="Furniture">Furniture</Select.Option>
          <Select.Option value="Grocery">Grocery</Select.Option>
          <Select.Option value="Beauty">Beauty</Select.Option>
        </Select>

        <Button type="primary" onClick={() => setOpen(true)}>
          + Add Product
        </Button>
      </div>

      <Table
        dataSource={products}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        style={{ marginTop: 20 }}
      />

      <Modal title="Enter product" open={open} onOk={HandleOk} onCancel={() => setOpen(false)}>
        <Form layout="vertical">
          <Form.Item label="Name" required>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Item>
          <Form.Item label="Price" required>
            <Input value={price} onChange={(e) => setPrice(e.target.value)} />
          </Form.Item>
          <Form.Item label="Category" required>
            <Input value={category} onChange={(e) => setCategory(e.target.value)} />
          </Form.Item>
          <Form.Item label="Description">
            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Item>
          <Form.Item label="Image URL">
            <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>
    </Wrapper>
  );
};
