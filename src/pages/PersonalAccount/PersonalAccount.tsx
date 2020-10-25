import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ToastProvider, useToasts } from "react-toast-notifications";
import $ from "jquery";
import { Spinner, Button } from "react-bootstrap";
import AccountInfo from "../../components/AccountInfo/AccountInfo";
import Summary from "../../components/Summary/Summary";
import Menu from "../../components/Menu/Menu";

import "./PersonalAccount.css";

interface UserInfo {
  data: Array<any>;
}

const IndividualContent: React.FC<UserInfo> = (data) => {
  //Проверка данных if role -> student, if -> employer, if -> admin
  //Y Student -> Summary
  let history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const logout = () => {
    setLoading(true);
    $.post(
      `/ajax/logout.php`,
      {
        target: "logout",
      },
      function (data) {
        var response = $.parseJSON(data);
        if (response.status == 0) {
          history.push("/");
        }
        setLoading(false);
      }
    );
  };

  return (
    <React.Fragment>
      {isLoading && <Spinner className="spinner__loading" animation="border" style={{marginBottom: 15}}/>}
      <Button variant="outline-danger" onClick={logout}>
        Выйти
      </Button>
    </React.Fragment>
  );
};

const PersonalAccount: React.FC = () => {
  let history = useHistory();
  const { addToast } = useToasts();
  const [isLoading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [isLogin, setLogin] = useState<Boolean>(false);

  useEffect(() => {
    $.post(
      `/ajax/get_user.php`,
      {
        target: "get-user",
      },
      function (data) {
        var response = $.parseJSON(data);
        if (response.status == 0) {
          setLogin(true);
        } else {
          addToast("Не удалось получить данные", { appearance: "error" });
        }
        setLoading(false);
      }
    );
  });

  if (isLoading) {
    return <Spinner className="spinner__loading" animation="border" />;
  }

  return (
    <React.Fragment>
      <Menu isLoading={isLoading} isLogin={isLogin} />
      <div className="personal_account">
        <h1 className="personal_account__header">Личные данные</h1>
        <AccountInfo />
        <IndividualContent data={userData} />
      </div>
    </React.Fragment>
  );
};

export default PersonalAccount;
