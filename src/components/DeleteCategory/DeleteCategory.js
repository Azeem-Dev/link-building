import React, { useState } from "react";
import { Input, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const DeleteCategory = ({ deleteCategory }) => {
  const [category, setCategory] = useState("");

  const handleDeleteClick = () => {
    if (category.length > 0) {
      // ....
      deleteCategory(category);
      setCategory("");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Input
        placeholder="Category"
        maxLength={80}
        style={{
          marginTop: "10px",
          padding: "10px 5px",
          fontSize: "16px",
          marginBottom: "10px",
        }}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <Button
        type="primary"
        icon={<DeleteOutlined />}
        style={{ fontSize: "18px" }}
        danger
        onClick={handleDeleteClick}
      >
        DELETE
      </Button>
    </div>
  );
};

export default DeleteCategory;
