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
            await dispatch(registerThunk({
                username,
                firstName,
                lastName,
                email,
                password,
            }))
            navigate('/profile');
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
//   <Form
//     name="basic"
//     labelCol={{
//       span: 8,
//     }}
//     wrapperCol={{
//       span: 16,
//     }}
//     style={{
//       maxWidth: 600,
//     }}
//     initialValues={{
//       remember: true,
//     }}
//     onFinish={onClickHandler}
//     onFinishFailed={onFinishFailed}
//     autoComplete="off"
//   >
//     <Form.Item
//       label="Username"
//       name="username"
//       rules={[
//         {
//           required: true,
//           message: 'Please input your username!',
//         },
//       ]}
//     >
//       <Input />
//     </Form.Item>

//     <Form.Item
//       label="Password"
//       name="password"
//       rules={[
//         {
//           required: true,
//           message: 'Please input your password!',
//         },
//       ]}
//     >
//       <Input />
//     </Form.Item>

//     <Form.Item
//       label="First Name"
//       name="firstname"
//       rules={[
//         {
//           required: true,
//           message: 'Please input your first name!',
//         },
//       ]}
//     >
//       <Input />
//     </Form.Item>

//     <Form.Item
//       label="Last Name"
//       name="lastname"
//       rules={[
//         {
//           required: true,
//           message: 'Please input your last name!',
//         },
//       ]}
//     >
//       <Input />
//     </Form.Item>

//     <Form.Item
//       label="Email"
//       name="email"
//       rules={[
//         {
//           required: true,
//           message: 'Please input your email!',
//         },
//       ]}
//     >
//       <Input />
//     </Form.Item>

//     <Form.Item
//       wrapperCol={{
//         offset: 8,
//         span: 16,
//       }}
//     >
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

//     </Form.Item>
//   </Form>
);
}
export default Register;