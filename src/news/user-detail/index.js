import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from 'axios';
import { Avatar, Divider, Button, Card } from 'antd';
import {
    UserOutlined
} from '@ant-design/icons';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const UserDetail = (
) => {
    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const [profile, setProfile] = useState({ username: "N/A", password: "123", firstName: "N/A", lastName: "N/A", email: "N/A" });
    const [isFollowing, setIsFollowing] = useState(false);
    const [updateTrigger, setUpdateTrigger] = useState(false);

    const getUserProfile = () => {
        // if (user) {
            axios.get(`${BASE_URL}/users/${id}`)
                .then(response => {
                    setProfile(response.data);
                    getFollowing();
                })
                .catch(error => {
                    console.error(error);
                });
        // }
    }

    const handleFollow = () => {
        if (user) {
            axios.put(`${BASE_URL}/user/${user._id}/follow/${id}`)
            .then(response => {
                setIsFollowing(isFollowing => !isFollowing); // todo: check if this works
            })
            .catch(error => {
                console.error(error);
            });
        }
    }

    const getFollowing = () => {
        if (user) {
            axios.get(`${BASE_URL}/user/${user._id}/follow/${id}`)
            .then(response => {
                setIsFollowing(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        }
    }
    const toggleFollowing = () => {
        // if (user) {
        //     axios.put(`${BASE_URL}/user/${user._id}/bookmark/${id}`)
        //         .then(response => setBookmark(status => !status))
        //         .catch(error => {
        //             console.error(error);
        //         });
        // }
    }

    useEffect(() => {
        getUserProfile();
        // getFollowing();
    }, [updateTrigger]);

    const onFinish = (value) => {
        axios.put(`${BASE_URL}/users/${user._id}`, { ...value, token: user.token })
            .then(response => setUpdateTrigger(status => !status))
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div>
            <h4>User Profile</h4>
            <p>{user ? user.username : ''}</p>
            <Divider />
            <Card>
                <Avatar size={64} icon={<UserOutlined/>} />
                <Divider />
                <h3>{profile.username}</h3>
                <p>First Name: {profile.firstName}</p>
                <p>Last Name: {profile.lastName}</p>
                {user && <Button type="primary" onClick={handleFollow}>
                    {isFollowing ? 'Unfollow' : 'Follow'}
                </Button>}
            </Card>
        </div>);
}

export default UserDetail;