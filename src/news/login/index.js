import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginThunk } from "../../services/user-thunks";

import { Button, Divider, Checkbox, Form, Input } from 'antd';

const Login = () => {
  const [username, setUsername] = useState("user1");
  const [password, setPassword] = useState("123");
  const [role, setRole] = useState("user")
  const dispatch = useDispatch();
  const onClickHandler = async () => {
    if (!(username && password && role)) {
      alert("Please fill in all fields");
      return;
    }
    if (role === 'admin' && username !== 'admin') {
      alert("This user is not admin");
      return;
    }
    try {
      await dispatch(loginThunk(
        {
          username,
          password,
          role,
        }
      ))
      // navigate('/profile');
    } catch (e) {
      alert(e);
    }
  }
  return (
    <div>
      <h4>Login</h4>
      <Divider />
      <div>
        <label>Username</label>
        <br />
        <input
          className="form-control"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </div>
      <br />
      <div style={{ marginBottom: "20px" }}>
        <label>role:</label><br />
        <input
          id="user"
          type="radio"
          name="role"
          value="user"
          style={{ marginRight: "5px" }}
          onChange={(event) => setRole(event.target.value)}
          checked
        />
        <label for="user">user</label><br />
        <input
          id="admin"
          type="radio"
          name="role"
          value="admin"
          style={{ marginRight: "5px" }}
          onChange={(event) => setRole(event.target.value)}

        />
        <label for="admin">admin</label><br />

        <input
          id="creator"
          type="radio"
          name="role"
          value="creator"
          style={{ marginRight: "5px" }}
          onChange={(event) => setRole(event.target.value)}
        />
        <label for="creator">creator</label>
      </div>
      <Button className="btn btn-primary" style={{ padding: "0 20px" }} htmlType="submit" onClick={onClickHandler}>
        Login
      </Button>
      <Button className="btn btn-light" style={{ padding: "0 20px" }} type="link">
        <Link to="/signup" style={{ textDecoration: "none" }}>Signup</Link>
      </Button>
    </div>

  )
};
export default Login;