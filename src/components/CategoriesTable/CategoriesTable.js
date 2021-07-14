import React from "react";
import { List, Typography, Tag } from "antd";
import { tagColors } from "../../containers/Home/constants";
import { getRandomItem } from "../../utils/randomItemGetter/randomItemGetter";
import { truncateString } from "../../utils/truncateString/truncateString";
const { Title } = Typography;

const CategoriesTable = ({ data = {} }) => {
  return (
    <div>
      <List
        header={
          <div>
            <Title level={3}>{data.category}</Title>
          </div>
        }
        bordered
        dataSource={data.list}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 4,
        }}
        renderItem={(item) => (
          <List.Item>
            <Title level={5}>{item.title}</Title>
            <p>{truncateString(item.description, 20)}</p>
            <a href={item.link}>{item.link}</a>
            {item.subCategories.map((c) => {
              return (
                <Tag color={getRandomItem(tagColors)} key={c.id}>
                  {c.name}
                </Tag>
              );
            })}
          </List.Item>
        )}
      />
    </div>
  );
};

export default CategoriesTable;
