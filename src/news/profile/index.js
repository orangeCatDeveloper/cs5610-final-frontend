import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Avatar, Divider, Button, Form, Input } from 'antd';
import {
    UserOutlined
} from '@ant-design/icons';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const EditProfile = (
) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const [profile, setProfile] = useState({ username: "N/A", password: "123", firstName: "N/A", lastName: "N/A", email: "N/A" });
    const [updateTrigger, setUpdateTrigger] = useState(false);
    const [form] = Form.useForm();

    const getUserProfile = () => {
        if (user) {
            axios.get(`${BASE_URL}/users/${user._id}`)
                .then(response => {
                    form.setFieldsValue(response.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }

    useEffect(() => {
        getUserProfile();
    }, [updateTrigger]);

    const onFinish = (value) => {
        axios.put(`${BASE_URL}/users/${user._id}`, { ...value, token: user.token })
            .then(response => {
                setUpdateTrigger(status => !status)
                alert("Update success");
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div>
            <h4>My Profile</h4>
            <Divider />
            <Avatar style={{ marginBottom: "5px" }} size={64} icon={<UserOutlined />} />
            {user && <h4>Role: {user.role}</h4>}
            <Form
                form={form}
                layout="vertical"
                style={{ maxWidth: 600, marginTop: "15px" }}
                initialValues={{ ...profile }}
                onFinish={onFinish}>
                <Form.Item name="username" label="Username">
                    <Input disabled={true} />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item name="firstName" label="First Name">
                    <Input />
                </Form.Item>
                <Form.Item name="lastName" label="Last Name">
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="Email">
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit">
                    Update
                </Button>
            </Form>
        </div>);
}

export default EditProfile;