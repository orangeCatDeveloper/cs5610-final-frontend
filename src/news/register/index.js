import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { registerThunk } from "../../services/user-thunks";
import { Button, Checkbox, Form, Input } from 'antd';
// const onFinish = (values) => {
//   console.log('Success:', values);
// };
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};


const Register = () => {
    const [username, setUsername] = useState("user1");
    const [password, setPassword] = useState("123");
    const [firstName, setFirstName] = useState("max");
    const [lastName, setLastName] = useState("cai");
    const [email, setEmail] = useState("123@gmail.com");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onClickHandler = async () => {
        try {
            await dispatch(registerThunk(
                username,
                firstName,
                lastName,
                
                password,
                email,
            ))
            // navigate('/profile');
        } catch (e) {
            alert(e);
        }
        // const newUser = {
        //     username: values.username,
        //     firstName: values.firstName,
        //     lastName: values.lastName,
        //     email: values.email,
        //     password: values.password,
        // }
        // dispatch(registerThunk(newUser))
    }
    return(
    <div>
      <h1>Login Screen</h1>
      <div>
        <label>Username</label>
        <br />
        <input
          className="form-control"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          className="form-control"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <label>firstName</label>
        <br />
        <input
          className="form-control"
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
      </div>
      <div>
        <label>lastName</label>
        <br />
        <input
          className="form-control"
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
      </div>
      <div>
        <label>email</label>
        <br />
        <input
          className="form-control"
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <Button type="primary" htmlType="submit" onClick={onClickHandler}>
        Submit
      </Button>
    </div>
);
}
export default Register;