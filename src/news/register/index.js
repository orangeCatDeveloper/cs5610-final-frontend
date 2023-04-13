import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { registerThunk } from "../../services/user-thunks";
import { Button, Divider, Form, Input } from 'antd';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onClickHandler = async (value) => {
    try {
      await dispatch(registerThunk(
        value
      ));
      // navigate('/profile');
    } catch (e) {
      alert(e);
    }
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