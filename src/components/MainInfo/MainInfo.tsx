import React, { useState, useEffect } from "react";

import "./MainInfo.css";

const MainInfo: React.FC = () => {
  return (
    <div className="main_info">
      <h1 className="main_info__header">
        Мы помогаем студентам и работодателям находить друг друга
      </h1>
      <img src="images/main_info_big_image.png" alt="People discussing" className="main_info__big_image"/>
      <img src="images/main_info_small_image.png" alt="People discussing" className="main_info__small_image"/>
    </div>
  );
};

export default MainInfo;
