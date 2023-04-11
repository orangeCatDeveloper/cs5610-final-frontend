import axios from "axios";
const USERS_URL = "http://localhost:4000/api";

const api = axios.create({
  withCredentials: true,
});

export const findUserById = async (userId) => {
  const response = await api.get(`${USERS_URL}/users/${userId}`);
  const user = response.data;
  return user;
};

export const findAllUsers = async () => {
  const response = await api.get(`${USERS_URL}/users/`);
  const users = response.data;
  return users;
};


export const updateUser = async (user) => {
  const response = await api.put(`${USERS_URL}/users/${user._id}`, user);
  const status = response.data;
  return status;
};

export const login = async ({ username, password }) => {
  const response = await api.post(`${USERS_URL}/login`, {
    username,
    password,
  });
  const user = response.data;
  return user;
};

export const register = async (userInfo) => {
  const response = await api.post(`${USERS_URL}/register`, userInfo)
  .then(response => {
    console.log("Status code:", response.status);
  })
  .catch(error => {
    console.log(error.message)
    if (error.message.includes("409")) {
        alert("username already in use! Please change a new one")
    } else if (error.message.includes("400")) {
        alert("Please fill in all fields.")
    }
    
  });
  const user = response.data;
  return user;
};