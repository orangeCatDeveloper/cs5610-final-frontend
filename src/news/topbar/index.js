import React from 'react';
import { useNavigate } from 'react-router-dom';

import { DownOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

const items = [
  {
    key: '/profile',
    label: 'Profile',
  },
  {
    key: 'login',
    danger: true,
    label: 'Login',
  },
];
const Topbar = () => {
  const navigate = useNavigate();
  return(
    <div>
    <Dropdown
        menu={{
        items,
        }}
    >
        <a onClick={
            ({key}) => {
                if (key === "logout") {
                    // TODO
                } else {
                    navigate(key)
                }
            }
        }>
        <Space>
            <UserOutlined/>
            User
            <DownOutlined />
        </Space>
        </a>
    </Dropdown>
    </div>

);
};
export default Topbar;