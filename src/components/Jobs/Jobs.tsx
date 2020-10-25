import React, { useState, useEffect } from "react";

import "./Jobs.css";

import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";

const Jobs: React.FC<{ vacancies: any, isJobsLoading: boolean }> = ({
  children,
  vacancies,
  isJobsLoading
}) => {
  const [job_offers, setVacancies] = useState<any>(vacancies);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(isJobsLoading);
  }, [isJobsLoading]);

  useEffect(() => {
    setVacancies(vacancies);
  }, [vacancies]);

  if (isLoading) {
    return (
      <div className="jobs">
        <h2 className="block_header">Вакансии</h2>
        <hr className="block_separator" />
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="jobs">
      <h2 className="block_header">Вакансии</h2>
      <hr className="block_separator" />
      <div className="job_offers">
        {job_offers.map((vacancy: any, index: number) => (
          <div className="job_offer">
            <div className="location">
              <img src="images/location.png" alt="Location" />
              <span className="location_text">Воронеж</span>
            </div>
            <h2 className="offer_position">{vacancy.title}</h2>
            <h3 className="offer_company">{vacancy.salary} руб.</h3>
            <div className="offer_advantages">
              <div className="offer_advantage">
                <img src="images/offer_checkbox.png" alt="Advantage" />
                <span className="offer_advantage__text">
                  Подходит для практики
                </span>
              </div>
              <div className="offer_advantage">
                <img src="images/offer_checkbox.png" alt="Advantage" />
                <span className="offer_advantage__text">Можно без опыта</span>
              </div>
            </div>
            <button className="offer_respond_button">Подробнее</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Jobs;
