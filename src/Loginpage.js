import React, { useState } from "react";
import "./App.css";
import { Input, Button, Form, Alert } from "antd";
import firebase from "./firebase.js";

// check if logins match a firebase database
// return the matching login id/entire object to the app.js

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function LoginPage(props) {
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);

  const onFinish = (values) => {
    // check if ther are any matches
    checkFireBaseMatches(values);
  };

  const onFinishFailed = (errorInfo) => {
    setSuccess(false);
    setFail(true);
  };

  const updateValue = (value, i) => {
    let empty = {};
    empty[i] = value;
    props.updateLogin(empty);
    setSuccess(true);
    setFail(false);
  };

  const checkFireBaseMatches = (value) => {
    const itemsRef = firebase.database().ref("items");
    itemsRef.on("value", (snapshot) => {
      for (let i in snapshot.val()) {
        if (
          snapshot.val()[i].username === value.username &&
          snapshot.val()[i].password === value.password
        ) {
          // return the value
          updateValue(snapshot.val()[i], i);
          return;
        }
      }
      setSuccess(false);
      setFail(true);
    });
  };

  return (
    <>
      <div className="register-section">
        <div className="register">
          <h2>Login Account</h2>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input autoComplete="username" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password autoComplete="current-password" />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          {success && <Alert message="Logged In" type="success" />}
          {fail && <Alert message="Incorrect Login🙃" type="warning" />}
        </div>
      </div>
    </>
  );
}
export default LoginPage;
