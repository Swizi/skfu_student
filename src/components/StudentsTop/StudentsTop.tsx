import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./StudentsTop.css";

const Jobs: React.FC = () => {
  return (
    <div className="students_top">
      <h2 className="block_header">Топ студентов</h2>
      <hr className="block_separator" />
      <ol className="students_top_list">
        <li className="student_top">
        <Link to="/">Алиев Тимур Александрович</Link>
          <br /><br/>
          Физ-тех. 5 курс. <b>856</b> балла
        </li>
        <li className="student_top">
          <Link to="/">Алиев Тимур Александрович</Link>
          <br /><br/>
          Физ-тех. 5 курс. <b>855</b> балла
        </li>
        <li className="student_top">
        <Link to="/">Алиев Тимур Александрович</Link>
          <br /><br/>
          Физ-тех. 5 курс. <b>854</b> балла
        </li>
        <li className="student_top">
        <Link to="/">Алиев Тимур Александрович</Link>
          <br /><br/>
          Физ-тех. 5 курс. <b>853</b> балла
        </li>
        <Link to="/" className="open_top__text">Весь рейтинг...</Link>
      </ol>
    </div>
  );
};

export default Jobs;
