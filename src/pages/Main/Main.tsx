import React, { useState, useEffect } from "react";
import Menu from "../../components/Menu/Menu";
import MainInfo from "../../components/MainInfo/MainInfo";
import Search from "../../components/Search/Search";
import Jobs from "../../components/Jobs/Jobs";
import StudentsTop from "../../components/StudentsTop/StudentsTop";

import "./Main.css";

const Main: React.FC = () => {
  return (
    <React.Fragment>
      <Menu />
      <MainInfo />
      <Search />
      {/* <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      > */}
        <Jobs />
        <StudentsTop />
      {/* </div> */}
    </React.Fragment>
  );
};

export default Main;
