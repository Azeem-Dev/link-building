import React, { useState, useEffect } from "react";
import { Input, Typography } from "antd";
import _ from "lodash";
const { Search } = Input;
const { Title } = Typography;
const SearchBox = ({ updateSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const search = _.debounce(() => {
    updateSearch(searchValue);
  }, 700);

  useEffect(() => {
    search();
  }, [searchValue]);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "80%",
          height: "15vh",
          margin: "0 auto",
        }}
      >
        <Search
          placeholder="ENTER TITLE / DESCRIPTION"
          enterButton="Search"
          size="large"
          loading={false}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          value={searchValue}
          onPressEnter={() => console.log("Entered Pressed")}
          onSearch={() => console.log("button clicked")}
        />
      </div>
    </div>
  );
};

export default SearchBox;
