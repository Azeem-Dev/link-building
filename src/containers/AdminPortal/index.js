import React, { useState, useEffect } from "react";
import AdminPage from "../../components/AdminPage/AdminPage";
import { getUtil, postUtil } from "../../utils/api/link-building-api";
import { message } from "antd";

const AdminPortal = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  useEffect(() => {
    getUtil("Category/GetAllCategories").then((c) => {
      setCategoriesData(c.data);
    });
  }, []);

  const deleteCategory = (CategoryName) => {
    postUtil("Category/DeleteCategory", { CategoryName }).then((c) => {
      if (c.data) {
        message.success("Category Deleted Successfully");
      }
    });
  };

  const deleteLink = (LinkName) => {
    postUtil("Link/DeleteLink", { LinkName }).then((c) => {
      if (c.data) {
        message.success("Link Deleted Successfully");
      }
    });
  };

  const createCategory = (formData) => {
    postUtil("Category/CreateCategory", formData).then((c) => console.log(c));
  };
  return (
    <div>
      <AdminPage
        categoriesData={categoriesData}
        deleteCategory={deleteCategory}
        deleteLink={deleteLink}
        createCategory={createCategory}
      />
    </div>
  );
};

export default AdminPortal;
