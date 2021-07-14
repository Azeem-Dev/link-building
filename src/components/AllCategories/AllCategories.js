import React, { useState, useEffect } from "react";
import { Tag, Table } from "antd";
import { getRandomItem } from "../../utils/randomItemGetter/randomItemGetter";
import { tagColors } from "../../containers/Home/constants";
const AllCategories = ({ categoriesData }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(categoriesData);
  }, [categoriesData]);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p key>{text}</p>,
    },
    {
      title: "SUB-CATEGORIES",
      key: "subCategory",
      render: (text, record) =>
        record.subCategories.map((c, i) => {
          return (
            <Tag color={getRandomItem(tagColors)} key={i}>
              {c.name}
            </Tag>
          );
        }),
    },
  ];
  return data.length > 0 ? (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 5,
      }}
    />
  ) : (
    <p>No data available</p>
  );
};

export default AllCategories;
