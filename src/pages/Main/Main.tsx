import React, { useState, useEffect } from "react";
import Menu from "../../components/Menu/Menu";
import MainInfo from "../../components/MainInfo/MainInfo";
import Search from "../../components/Search/Search";
import Jobs from "../../components/Jobs/Jobs";
import StudentsTop from "../../components/StudentsTop/StudentsTop";
import $ from "jquery";
import "./Main.css";

import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Main: React.FC = () => {
  const [isLogin, setLogin] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isJobsLoading, setJobsLoading] = useState<boolean>(false);
  const [vacancies, setVacancies] = useState<any>([]);
  useEffect(() => {
    $.post(
      `/ajax/check_auth.php`,
      {
        target: "checking",
      },
      function (data) {
        var response = $.parseJSON(data);
        if (response.status !== 0) {
          //Null
        } else {
          setLogin(true);
        }
      }
    );
    $.post(
      `/ajax/get_content.php`,
      {
        target: "get-main-content",
      },
      function (data) {
        var response = $.parseJSON(data);
        if (response.status == 0) {
          setVacancies(response.vacancies);
        }
        setLoading(false);
      }
    );
  }, []);

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }

  return (
    <React.Fragment>
      <Menu isLoading={isLoading} isLogin={isLogin}/>
      <MainInfo />
      <Search setVacancies={setVacancies} setLoading={setJobsLoading} />
      <Jobs vacancies={vacancies} isJobsLoading={isJobsLoading} />
      <StudentsTop />
    </React.Fragment>
  );
};

export default Main;
