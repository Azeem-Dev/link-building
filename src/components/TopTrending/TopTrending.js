import { getRandomItem } from "../../utils/randomItemGetter/randomItemGetter";
import React, { useState } from "react";
import { List, Typography, Tag } from "antd";
import { truncateString } from "../../utils/truncateString/truncateString";
import { useHistory } from "react-router";

const { Title } = Typography;

const TopTrending = ({ listData, tagColors }) => {
  const history = useHistory();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "80%",
        margin: "0 auto",
      }}
    >
      <Title level={2}>{"Top Trending".toUpperCase()}</Title>
      <ListDisplay
        listData={listData}
        tagColors={tagColors}
        history={history}
      />
    </div>
  );
};

const ListDisplay = ({ listData, tagColors, history }) => {
  const handleCategoryClick = (category_id) => {
    console.log(`inside category click with category Id ${category_id}`);
    history.push({
      pathname: "/category",
      state: {
        category_id,
      },
    });
  };
  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 2,
      }}
      dataSource={listData}
      renderItem={(item, index) => (
        <List.Item
          key={index}
          extra={
            <img
              width={272}
              alt="top trending"
              src="https://pbs.twimg.com/profile_images/766890997091491840/BUxAGD7-_400x400.jpg"
            />
          }
        >
          <List.Item.Meta
            title={item.title}
            description={
              <>
                {
                  truncateString(item.description, 50)
                }
                <br />
                <a href={item.link}>{item.link}</a>
              </>
            }
          />
          {item.content}
          <br />
          {item.categories.map((catg) => {
            return (
              <Tag
                color={getRandomItem(tagColors)}
                key={catg.id}
                onClick={() => handleCategoryClick(catg.id)}
                className="tag-handle"
              >
                {catg.name}
              </Tag>
            );
          })}
        </List.Item>
      )}
    />
  );
};

export default TopTrending;
