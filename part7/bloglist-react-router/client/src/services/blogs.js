import axios from "axios";
const baseUrl = "/api/blogs";

// let token = null;

const setToken = (newToken) => {
    const token = `Bearer ${newToken}`;
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const create = async (newObject, auth) => {
    const token = `Bearer ${auth.token}`;
    const config = {
        headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};

const update = (id) => {
    const request = axios.put(`${baseUrl}/${id}`);
    return request.then((response) => response.data);
};

const remove = (id, token) => {
    const config = {
        headers: { Authorization: token },
    };

    const request = axios.delete(`${baseUrl}/${id}`, config);
    return request.then((response) => response.data);
};

export default { getAll, create, update, remove, setToken };
