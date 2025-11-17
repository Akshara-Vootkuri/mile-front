
import styled from "styled-components";
import { DatePicker, Input, Table, Button, Modal, Form, message } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate, useLocation } from "react-router-dom";

const Wrapper = styled.div`
  padding: 30px;
  background: #f5f7ff;
  min-height: 100vh;
   @media (max-width: 768px) {
    padding: 20px;
  }
  @media (max-width: 480px) {
    padding: 15px;
  }
`;

const Title = styled.h2`
  margin-bottom: 25px;
  font-size: 28px;
  font-weight: 800;
  color: #4a4a4a;
   @media (max-width: 768px) {
    font-size: 24px;
  }
  @media (max-width: 480px) {
    font-size: 20px;
    text-align: center;
  }
`;

const DateRow = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    gap: 20px;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 15px;
  }
`;

const DateBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  p {
    font-weight: 600;
    color: #6c63ff;
  }
     @media (max-width: 480px) {
    width: 100%;
  }
`;

const SearchRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0;
   @media (max-width: 768px) {
    gap: 15px;
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;

    input {
      width: 100% !important;
    }
    button {
      width: 100%;
    }
  }
`;

const ColorButton = styled(Button)`
  background: #6c63ff;
  border-color: #6c63ff;
  font-weight: 600;
  border-radius: 6px;

  &:hover {
    background: #574fe8;
    border-color: #574fe8;
  }
`;

const StyledInput = styled(Input)`
  border: 2px solid #6c63ff;
  border-radius: 6px;
  color: #202020;
  background: #ffffff;
  font-weight: 500;

  &::placeholder {
    color: #999;
  }

  &:focus {
    border-color: #867dff;
    box-shadow: 0 0 4px #867dff;
  }
     @media (max-width: 600px) {
    width: 100%;
  }
`;
const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;   /* important */
  
  @media (max-width: 600px) {
    padding-bottom: 10px;
  }
`;
const StyledTable = styled(Table)`
  background: white;
  border-radius: 10px;
  padding: 10px;

  .ant-table-thead > tr > th {
    background: #efeefe;
    color: #5a54d6;
    font-weight: 700;
  }

  .ant-table-tbody > tr > td {
    background: #ffffff;
    color: #333;
  }

  .ant-table-row:hover > td {
    background: #f3f2ff;
  }
      @media (max-width: 600px) {
    .ant-table-thead > tr > th {
      font-size: 12px;
      padding: 8px;
    }
    .ant-table-tbody > tr > td {
      font-size: 12px;
      padding: 8px;
    }
  }

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

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);

  const HandleStart = (date) => setStart(date ? date.toDate() : null);
  const HandleEnd = (date) => setEnd(date ? date.toDate() : null);

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

  useEffect(() => {
    if (location.state?.newProduct) {
      setProducts((prev) => [location.state.newProduct, ...prev]);
    }
  }, [location.state]);

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
    {
      title: "Image",
      dataIndex: "thumbnail",
      render: (img) => (
        <img
          src={img}
          alt="product"
          style={{
            width: "130px",
            height: "130px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
      ),
    },
  ];

  const HandleOk = () => {
    if (!title || !price || !category) {
      message.warning("Please fill all fields");
      return;
    }

    navigate("/page2", {
      state: { title, price, category, image },
    });

    setTitle("");
    setPrice("");
    setCategory("");
    setImage(null);
    setOpen(false);
  };

  return (
    <Wrapper>
      <Title>Product Dashboard</Title>

      <DateRow>
        <DateBox>
          <p>Start Date:</p>
          <DatePicker
            value={dayjs(start)}
            onChange={HandleStart}
            disabledDate={disableStartDate}
          />
        </DateBox>

        <DateBox>
          <p>End Date:</p>
          <DatePicker
            value={dayjs(end)}
            onChange={HandleEnd}
            disabledDate={disableEndDate}
          />
        </DateBox>
      </DateRow>

      <SearchRow>
        <StyledInput
          placeholder="search by category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 250 }}
        />

        <ColorButton type="primary" onClick={() => setOpen(true)}>
          + Add Product
        </ColorButton>
      </SearchRow>
      <TableWrapper>
      <StyledTable
        dataSource={filteredProducts}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
      </TableWrapper>

      <Modal
        title="Enter new product"
        open={open}
        onOk={HandleOk}
        onCancel={() => setOpen(false)}
      >
        <Form layout="vertical">
          <Form.Item label="Product Title" required>
            <StyledInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter product title"
            />
          </Form.Item>

          <Form.Item label="Price" required>
            <StyledInput
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter product price"
            />
          </Form.Item>

          <Form.Item label="Category" required>
            <StyledInput
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter product category"
            />
          </Form.Item>

          <Form.Item label="Upload Image">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImage(URL.createObjectURL(file));
                }
              }}
            />

            {image && (
              <img
                src={image}
                alt="preview"
                style={{
                  marginTop: 10,
                  width: 120,
                  height: 120,
                  borderRadius: 10,
                  objectFit: "cover",
                  border: "1px solid #ddd",
                }}
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    </Wrapper>
  );
};
