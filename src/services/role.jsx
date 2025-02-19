import axios from "axios";

const host = "http://localhost:3001";

const getRoles = () => {
  return axios.get(`${host}/roles`).then((r) => r.data);
};

const addRole = (data) => {
  return axios.post(`${host}/roles`, data).then((r) => r.data);
};

const deleteRole = (id) => {
  return axios.delete(`${host}/roles/${id}`).then((r) => r.data);
};

export default { getRoles, addRole, deleteRole };
