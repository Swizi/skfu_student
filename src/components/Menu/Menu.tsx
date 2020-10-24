import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

import "./Menu.css";

const Menu: React.FC = () => {
  useEffect(() => {
    const burger = document.querySelector(".burger")!;
    const mobile_menu = document.querySelector(".mobile_menu")!;
    burger.addEventListener("click", function () {
      burger.classList.toggle("burger_active");
      mobile_menu.classList.toggle("menu_active");
    });
  }, []);
  return (
    <div className="menu_container">
      <div className="menu">
        <div className="logo">
          <img src="images/skfu_logo.png" alt="Logo"/>
          <h3 className="logo__text">
            Северо-Кавказский федеральный университет
          </h3>
        </div>
        <div className="logo__user">
          <Link to="/Registration" className="logo__registration_button">
            Регистрация
          </Link>
          <Link to="/Logination" className="logo__login_button">
            <span className="logo__login_text">Вход</span>
            <ExitToAppOutlinedIcon className="logo__login_image" />
          </Link>
        </div>
      </div>
      <img
        src="images/skfu_logo.png"
        style={{ display: "none" }}
        className="mobile_menu__logo"
        alt="Logo"
      />
      <div className="mobile_menu" style={{ visibility: "hidden" }}>
        <div className="mobile_menu__wrapper">
        <Link to="/Registration" className="logo__registration_button">
          Регистрация
        </Link>
        <Link to="/Logination" className="logo__login_button">
          <span className="logo__login_text" style={{ color: "#fff" }}>
            Вход
          </span>
          <ExitToAppOutlinedIcon
            className="mobile__login_image"
          />
        </Link>
        </div>
      </div>
      <div className="burger" style={{ display: "none" }}>
        <span className="burger_line burger_line_first"></span>
        <span className="burger_line burger_line_second"></span>
        <span className="burger_line burger_line_third"></span>
        <span className="burger_line burger_line_fourth"></span>
      </div>
    </div>
  );
};

export default Menu;
