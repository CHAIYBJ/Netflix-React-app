import React from "react";
import requests from "../components/Requests";
import Row from "../components/Row";
import Main from "../components/Main";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Main />
      <Row  rowID="1" title="upComing" fetchURL={requests.requestTopRated} />
      <Row  rowID="2" title="Popular" fetchURL={requests. requestPopular} />
      <Row  rowId="3" title="Trending" fetchURL={requests.requestTrending} />
      <Row rowId="4" title="Top Rated" fetchURL={requests.requestTopRated} />
      <Row rowId="5"  title="Horror" fetchURL={requests. requestPopular} />
    
    </>
  );
};

export default Home;
