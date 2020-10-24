import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";

import "./Menu.css";

const Menu: React.FC = () => {
  const [isLogin, setLogin] = useState<Boolean>(false);
  useEffect(() => {
    if (localStorage.getItem("login")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
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
          <h3 className="logo__text">StudyJob</h3>
        </div>
        <div className="logo__user">
          {!isLogin && (
            <React.Fragment>
              {!isLogin && (
                <Link to="/PersonalAccount" className="logo__login_button">
                  Личный кабинет
                </Link>
              )}
              <Link to="/Registration" className="logo__registration_button">
                Регистрация
              </Link>
              <Link to="/Login" className="logo__login_button">
                <span className="logo__login_text">Вход</span>
                <ExitToAppOutlinedIcon className="logo__login_image" />
              </Link>
            </React.Fragment>
          )}
        </div>
      </div>
      <h3 className="logo__text_mobile">StudyJob</h3>
      <div className="mobile_menu" style={{ visibility: "hidden" }}>
        <div className="mobile_menu__wrapper">
          {!isLogin && (
            <React.Fragment>
              {!isLogin && (
                <Link to="/PersonalAccount" className="mobile_menu__item">
                  Личный кабинет
                </Link>
              )}
              <Link to="/Registration" className="logo__registration_button">
                Регистрация
              </Link>
              <Link to="/Login" className="logo__login_button">
                <span className="logo__login_text" style={{ color: "#fff" }}>
                  Вход
                </span>
                <ExitToAppOutlinedIcon className="mobile__login_image" />
              </Link>{" "}
            </React.Fragment>
          )}
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
