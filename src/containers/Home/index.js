import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import { tagColors } from "./constants";
import SearchBox from "../../components/SearchBox/SearchBox";
import TopTrending from "../../components/TopTrending/TopTrending";
import SearchResult from "../../components/SearchResult/SearchResult";
import {
  getUtil,
  postUtil,
  setDefault,
} from "../../utils/api/link-building-api";

const Home = () => {
  const [search, setSearch] = useState("");
  const [listData, setListData] = useState([]);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    const url = "Category/GetTopTrending";
    getUtil(url).then((c) => {
      if (c.data.success) {
        setListData(c.data.data);
      }
    });

    if (
      localStorage.getItem("accessToken") !== null ||
      localStorage.getItem("accessToken") !== ""
    ) {
      setDefault();
    }
  }, []);

  useEffect(() => {
    const url = "Category/SearchLink";
    postUtil(url, { keyword: search }).then((c) => {
      setSearchData(c.data.data);
    });
  }, [search]);
  return (
    <div>
      <SearchBox updateSearch={(value) => setSearch(value)} />
      {search != "" ? (
        <SearchResult listData={searchData} tagColors={tagColors} />
      ) : (
        ""
      )}
      <TopTrending listData={listData} tagColors={tagColors} />
    </div>
  );
};

export default Home;
