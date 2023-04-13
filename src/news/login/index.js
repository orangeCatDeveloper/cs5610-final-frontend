import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginThunk } from "../../services/user-thunks";

import { Button, Divider, Form, Input, Radio } from 'antd';

const Login = () => {
  const dispatch = useDispatch();
  const onLoginHandler = async (value) => {
    const { role, username } = value;
    if (role === 'admin' && username !== 'admin') {
      alert("This user is not admin");
      return;
    }
    try {
      await dispatch(loginThunk(
        value
      ))
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div>
      <h4>Login</h4>
      <Divider />
      <Form
        style={{ maxWidth: 400 }}
        onFinish={onLoginHandler}
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
          name="role"
          label="Role"
          rules={[{ required: true, message: 'Please select a role!' }]}
        >
          <Radio.Group >
            <Radio value="user">user</Radio>
            <Radio value="creator">creator</Radio>
            <Radio value="admin">admin</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
          <Button type="primary" style={{ marginLeft: "20px" }}>
            <Link to="/signup" style={{ textDecoration: "none" }}>Signup</Link>
          </Button>
        </Form.Item>
      </Form>
    </div>

  )
};
export default Login;