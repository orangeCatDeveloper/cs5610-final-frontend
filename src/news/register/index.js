import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import axios from 'axios';
import { Button, Divider, Form, Input } from 'antd';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Register = () => {
  const navigate = useNavigate();
  const onClickHandler = async (value) => {
    axios.post(`${BASE_URL}/register`, value)
      .then(response => {
        console.log("Status code:", response.status);
      })
      .catch(error => {
        console.log(error.message)
        if (error.message.includes("409")) {
          alert("username already in use! Please change a new one")
        } else if (error.message.includes("400")) {
          alert("Please fill in all fields.")
        }
      });
  }
  return (
    <div>
      <h4>Register</h4>
      <Divider />
      <Form
        style={{ maxWidth: 400 }}
        onFinish={onClickHandler}
        layout="vertical"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default Register;