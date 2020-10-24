import React, { useState, useEffect } from "react";

import "./Jobs.css";

const Jobs: React.FC = () => {
  return (
    <div className="jobs">
      <h2 className="block_header">Вакансии</h2>
      <hr className="block_separator" />
      <div className="job_offers">
        <div className="job_offer">
          <div className="location">
            <img src="images/location.png" alt="Location" />
            <span className="location_text">Воронеж</span>
          </div>
          <h2 className="offer_position">Менеджер-операционист банка</h2>
          <h3 className="offer_company">
            Воронежский филиал АО "Россельхозбанк"
          </h3>
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
          <button className="offer_respond_button">Откликнуться</button>
        </div>
        <div className="job_offer">
          <div className="location">
            <img src="images/location.png" alt="Location" />
            <span className="location_text">Воронеж</span>
          </div>
          <h2 className="offer_position">Менеджер-операционист банка</h2>
          <h3 className="offer_company">
            Воронежский филиал АО "Россельхозбанк"
          </h3>
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
          <button className="offer_respond_button">Откликнуться</button>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
