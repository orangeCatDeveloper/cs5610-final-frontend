import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import axios from 'axios';
import { Button, Divider, Form, Input } from 'antd';
import { ROUTE_PATHS } from "../../constants/path";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const CreateNews = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const onClickHandler = async (value) => {
        if (user) {
            axios.post(`${BASE_URL}/user/${user._id}/news`, value)
                .then(response => {
                    console.log("Status code:", response.status);
                })
                .catch(error => {
                    console.log(error.message);
                });
        }
        navigate(ROUTE_PATHS.HOME);
    }

    return (
        <div>
            <h4>Create News</h4>
            <Divider />
            <Form
                style={{ maxWidth: 400 }}
                onFinish={onClickHandler}
                layout="vertical"
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input title!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true, message: 'Please input description!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Content"
                    name="content"
                    rules={[{ required: true, message: 'Please input content!' }]}
                >
                    <Input.TextArea rows={4} allowClear showCount />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        create
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
export default CreateNews;