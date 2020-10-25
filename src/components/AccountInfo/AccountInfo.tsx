import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";

import "./AccountInfo.css";

const AccountInfo: React.FC = () => {
  return (
    <div className="account_info">
      <ListGroup variant="flush">
        <ListGroup.Item>Логин: <span className="account_info__item">Vasya</span></ListGroup.Item>
        <ListGroup.Item>ФИО: <span className="account_info__item">Vasya Uskov</span></ListGroup.Item>
        <ListGroup.Item>Роль: <span className="account_info__item">barmen</span></ListGroup.Item>
        <ListGroup.Item>E-mail: <span className="account_info__item">vasya@mail.ru</span></ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default AccountInfo;
