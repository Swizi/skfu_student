import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import { ToastProvider, useToasts } from "react-toast-notifications";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";

import "./Login.css";

import { useFormik } from "formik";

interface LoginValues {
  login: string;
  password: string;
}

const validate = (values: LoginValues) => {
  let isError = false;
  const errors: LoginValues = {
    login: "",
    password: "",
  };

  if (!/^[a-zA-Z0-9-_]{5,15}$/g.test(values.login)) {
    errors.login = "Логин меньше 16 и больше 4 символов";
    isError = true;
  }

  if (values.password.length <= 3) {
    errors.password = "Пароль больше 3 символов";
    isError = true;
  }

  if (isError) {
    return errors;
  } else {
    return {};
  }
};

const Login: React.FC = () => {
  let history = useHistory();
  const { addToast } = useToasts();
  const [isLoading, setLoading] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validate,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      addToast("Загрузка...", { appearance: "info", autoDismiss: true });
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
            history.push("/");
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
        <IconButton onClick={() => history.goBack()}>
          <ArrowBackIcon />
        </IconButton>
        <h3 className="block_header">Вход</h3>
        <hr className="block_separator" />
        <form method="GET" className="form" onSubmit={formik.handleSubmit}>
          <Form.Group controlId="formBasicLogin">
            <Form.Label>Логин</Form.Label>
            <Form.Control
              value={formik.values.login}
              type="text"
              placeholder="Введите логин"
              id="login"
              name="login"
              onChange={formik.handleChange}
            />
            {formik.errors.login !== "" && (
              <Form.Text className="text-muted">
                {formik.errors.login}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              value={formik.values.password}
              type="password"
              placeholder="Введите пароль"
              id="password"
              name="password"
              onChange={formik.handleChange}
            />
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
              id="employer"
              label="Я работодатель"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="form_submit">
            Зайти
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
