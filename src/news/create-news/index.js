import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { registerThunk } from "../../services/user-thunks";
import { Button, Divider, Input } from 'antd';
const CreateNews = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");

    const onClickHandler = async () => {


    };

    return (
        <div>
            <h4>Create News</h4>
            <Divider />

            <Button type="primary" htmlType="submit" style={{ marginTop: "20px" }} onClick={onClickHandler}>
                Create
            </Button>
        </div>
    );
}
export default CreateNews;