import React, { useState } from "react";
import { Tabs, Typography, Input, Button, Table } from "antd";
import { PaperClipOutlined, PlusCircleOutlined } from "@ant-design/icons";
import CreateLinkCategories from "../LinkCategoriesTable/CreateLinkCategories";
import AllCategories from "../AllCategories/AllCategories";
import DeleteLink from "../DeleteLink/DeleteLink";
import DeleteCategory from "../DeleteCategory/DeleteCategory";
const { Title } = Typography;
const { TabPane } = Tabs;
const size = "large";
const { Search } = Input;

const AdminPage = ({
  categoriesData,
  deleteCategory,
  deleteLink,
  createCategory,
}) => {
  const [activeKey, setActiveKey] = useState("1");
  const createCategoryLocal = (obj) => {
    createCategory(obj);
    setActiveKey("1");
  };
  return (
    <div style={{ width: "80%", margin: "10vh auto 0 auto" }}>
      <Title level={2}>ADMIN PORTAL</Title>
      <Tabs
        defaultActiveKey="1"
        type="card"
        size={size}
        activeKey={activeKey}
        onChange={(value) => setActiveKey(value)}
      >
        <TabPane tab="Get All Categories" key="1">
          <AllCategories categoriesData={categoriesData} />
        </TabPane>
        <TabPane tab="Create Category" key="2">
          <CreateLinkCategories createCategory={createCategoryLocal} />
        </TabPane>
        <TabPane tab="Delete Link" key="3">
          <DeleteLink deleteLink={deleteLink} />
        </TabPane>
        <TabPane tab="Delete Category" key="4">
          <DeleteCategory deleteCategory={deleteCategory} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminPage;
