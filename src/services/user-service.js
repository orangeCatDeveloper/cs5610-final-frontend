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

export const register = async (username, password, firstName, lastName, email) => {
  const response = await api.post(`${USERS_URL}/register`, {
    username,
    password,
    firstName,
    lastName,
    email
  });
  const user = response.data;
  return user;
};