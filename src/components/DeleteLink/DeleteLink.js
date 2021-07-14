import React, { useState } from "react";
import { Input, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
const DeleteLink = ({ deleteLink }) => {
  const [link, setLink] = useState("");

  const handleDeleteClick = () => {
    if (link.length > 0) {
      // ....
      deleteLink(link);
      setLink("");
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
        placeholder="Link"
        maxLength={80}
        style={{
          marginTop: "10px",
          padding: "10px 5px",
          fontSize: "16px",
          marginBottom: "10px",
        }}
        value={link}
        onChange={(e) => setLink(e.target.value)}
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

export default DeleteLink;
