import React, { useEffect, useState } from 'react';
import { List, Divider } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_URL;


const AdminCompoent = () => {
    const [userList, setUserList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BASE_URL}/users`)
            .then(response => {
                setUserList(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const clickUser = (user) => {
        console.log(user);
        //navigate(`/news-detail/${newsId}`);
    };

    return (
        <div>
            <h4>Admin page</h4>
            <Divider />
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 7,
                }}
                dataSource={userList}
                renderItem={(item) => (
                    <List.Item key={item._id} onClick={() => clickUser(item)}>
                        <List.Item.Meta
                            title={"Username: " + item.username}
                            description={"Full Name: " + item.firstName + " " + item.lastName}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default AdminCompoent;