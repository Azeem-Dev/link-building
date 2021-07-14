import React, { useEffect, useState } from "react";
import CategoriesTable from "../../components/CategoriesTable/CategoriesTable";
import { postUtil } from "../../utils/api/link-building-api";

const Category = ({ location }) => {
  const { category_id } = location.state;
  const [subCategoryData, setSubCategoryData] = useState({});

  useEffect(() => {
    console.log("Inside category page", category_id);
    const url = "Category/GetSubCategories";
    postUtil(url, { Id: category_id }).then((c) => {
      console.log(c.data);
      setSubCategoryData(c.data);
    });
  }, [category_id]);

  return (
    <div
      style={{
        width: "80%",
        margin: "10vh auto 0 auto",
        height: "100%",
      }}
    >
      <CategoriesTable data={subCategoryData} />
    </div>
  );
};

export default Category;
