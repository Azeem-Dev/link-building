import React, { useState } from "react";
import { Tabs, Typography, Input, Button, Table } from "antd";
import {
  PaperClipOutlined,
  PlusCircleOutlined,
  CheckOutlined,
} from "@ant-design/icons";
const { Title } = Typography;
const { TabPane } = Tabs;
const size = "large";
const { Search } = Input;

const CreateLinkCategories = ({ createCategory }) => {
  const [category, setCategory] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [subCategoryInputShow, setSubCategoryInputShow] = useState(false);
  const [subCategoryInput, setSubCategoryInput] = useState("");
  const [data, setData] = useState([]);
  const handleDelete = (id) => {
    let newSubCategories = data.filter((c) => c.id !== id);
    setData(newSubCategories);
  };

  const setCategoryMain = () => {
    setDisabled(true);
  };

  const showSubCategoryInput = () => {
    setSubCategoryInputShow(true);
  };

  const submitSubcategory = () => {
    console.log("insode subcategory");
    if (subCategoryInput.length > 0) {
      setData((data) => [{ id: data.length, name: subCategoryInput }, ...data]);
      setSubCategoryInput("");
    }
    setSubCategoryInputShow(false);
  };

  const handleSubmit = () => {
    console.log(
      data.map((c) => {
        return { name: c.name };
      })
    );
    var tobeSubmitted = {
      name: category,
      subCategories: data.map((c) => {
        return { name: c.name };
      }),
    };

    console.log("to be submitted", tobeSubmitted);
    createCategory({
      name: category,
      subCategories: data.map((c) => {
        return { name: c.name };
      }),
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <a onClick={() => handleDelete(record.id)}>Delete</a>
      ),
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "inline-flex", width: "100%" }}>
        <Input
          size="large"
          placeholder="Category Name"
          prefix={<PaperClipOutlined />}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          readOnly={isDisabled}
        />
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          style={{ marginLeft: "10px" }}
          onClick={setCategoryMain}
          disabled={isDisabled}
        ></Button>
      </div>
      {data.length > 0 ? (
        <div style={{ width: "100%" }}>
          <Title level={3}>SUB-CATEGORIES</Title>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              pageSize: 3,
            }}
          />
        </div>
      ) : (
        ""
      )}

      <div style={{ display: "flex" }}>
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          style={{ marginTop: "10px" }}
          onClick={showSubCategoryInput}
        >
          ADD SUBCATEGORY
        </Button>
        <Button
          type="primary"
          icon={<CheckOutlined />}
          style={{ marginTop: "10px" }}
          onClick={handleSubmit}
          danger
        >
          SUBMIT
        </Button>
      </div>
      {subCategoryInputShow ? (
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Input
            size="large"
            placeholder="Sub-Category Name"
            prefix={<PaperClipOutlined />}
            value={subCategoryInput}
            onChange={(e) => setSubCategoryInput(e.target.value)}
          />
          <Button
            type="primary"
            style={{ marginTop: "10px" }}
            onClick={submitSubcategory}
          >
            SUBMIT SUBCATEGORY
          </Button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default CreateLinkCategories;
