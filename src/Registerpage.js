import React, { useState, useEffect } from "react";
import "./App.css";
import { Input, Button, Form, Alert } from "antd";
import firebase from "./firebase.js";

// check if there are duplicate username created on firebase

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

function RegisterPage(props) {
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [duplicate, setDuplicate] = useState(false);

  const onFinish = (values) => {
    checkFireBase(values);
  };

  const onFinishFailed = (errorInfo) => {
    setSuccess(false);
    setFail(true);
    setDuplicate(false);
  };

  let addFireBase = (value) => {
    const itemsRef = firebase.database().ref("items");
    itemsRef.push(value);
  };

  // if there are duplicates username, do not create a new acc
  // if there are no duplicate username, do createa a new acc

  let checkDuplicate = (value, valueBoolean) => {
    if (!valueBoolean) {
      addFireBase(value);
      setSuccess(true);
      setFail(false);
      setDuplicate(false);
    } else {
      setSuccess(false);
      setFail(false);
      setDuplicate(true);
    }
  };

  let checkFireBase = (value) => {
    const itemsRef = firebase.database().ref("items");
    itemsRef.on("value", (snapshot) => {
      for (let i in snapshot.val()) {
        if (snapshot.val()[i].username === value.username) {
          checkDuplicate(value, true);
          return;
        }
      }
      checkDuplicate(value, false);
    });
  };

  return (
    <>
      <div className="register-section">
        <div className="register">
          <h2>Register Account</h2>
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
          {success && <Alert message="Created Account" type="success" />}
          {fail && <Alert message="Something's missing 🙃" type="warning" />}
          {duplicate && (
            <Alert message="Username's already taken 🙃" type="warning" />
          )}
        </div>
      </div>
    </>
  );
}
export default RegisterPage;
