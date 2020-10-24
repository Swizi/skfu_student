import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import { ToastProvider, useToasts } from "react-toast-notifications";

import "./Registration.css";

import { useFormik } from "formik";

interface RegistrationValues {
  login: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
}

const validate = (values: RegistrationValues) => {
  const errors: RegistrationValues = {
    login: "",
    fullName: "",
    email: "",
    password: "",
    role: "",
  };

  if (!/^[a-zA-Z0-9-_]{5,15}$/g.test(values.login)) {
    errors.login = "Логин меньше 16 и больше 4 символов";
  }

  if (values.password.length <= 3) {
    errors.password = "Пароль больше 3 символов";
  }

  if (values.fullName.length <= 3) {
    errors.fullName = "ФИО больше 3 символов";
  }

  if (!/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/g.test(values.email)) {
    errors.email = "Неправильный email";
  }

  return errors;
};

const Registration: React.FC = () => {
  let history = useHistory();
  const { addToast } = useToasts();
  const formik = useFormik({
    initialValues: {
      login: "",
      fullName: "",
      email: "",
      password: "",
      role: "",
    },
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      alert("Pushed");
      $.post(
        `/ajax/login.php`,
        {
          target: "logination",
          login: values.login,
          password: values.password,
        },
        function (data) {
          var response = $.parseJSON(data);
          if (response.status == 0) {
            localStorage.setItem("login", values.login);
            history.push("/Applications");
          } else {
            addToast("Ошибка входа", { appearance: "error" });
          }
        }
      );
    },
  });
  return (
    <div className="background_image">
      <div className="modal_window">
        <h3 className="block_header">Регистрация</h3>
        <hr className="block_separator" />
        <form method="GET" className="form" onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formBasicLogin">
            <Form.Label>Логин</Form.Label>
            <Form.Control value={formik.values.login} type="text" placeholder="Введите логин" id="login" name="login" onChange={formik.handleChange}/>
            {formik.errors.login !== "" && (
              <Form.Text className="text-muted" >
                {formik.errors.login}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicFullName">
            <Form.Label>ФИО</Form.Label>
            <Form.Control value={formik.values.fullName} type="text" placeholder="Введите ФИО" id="fullName" name="fullName" onChange={formik.handleChange}/>
            {formik.errors.fullName !== "" && (
              <Form.Text className="text-muted">
                {formik.errors.fullName}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control value={formik.values.email} type="email" placeholder="Введите email" id="email" name="email" onChange={formik.handleChange}/>
            {formik.errors.email !== "" && (
              <Form.Text className="text-muted">
                {formik.errors.email}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control value={formik.values.password} type="password" placeholder="Введите пароль" id="password" name="password" onChange={formik.handleChange}/>
            {formik.errors.password !== "" && (
              <Form.Text className="text-muted">
                {formik.errors.password}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicRadio">
            <Form.Check
              type="radio"
              name="role"
              id="student"
              label="Я студент"
              checked
            />
            <Form.Check
              type="radio"
              name="role"
              id="boss"
              label="Я работодатель"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="form_submit">
            Создать профиль
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
