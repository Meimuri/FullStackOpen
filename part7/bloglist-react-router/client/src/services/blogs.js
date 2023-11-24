import axios from "axios";
const baseUrl = "/api/blogs";

const generateToken = (auth) => {
    const token = `Bearer ${auth.token}`;
    const config = {
        headers: { Authorization: token },
    };

    return config;
};

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const create = async (newObject, auth) => {
    const config = generateToken(auth);
    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
};

const addLike = async (object) => {
    const response = await axios.put(`${baseUrl}/${object.id}`, object);
    return response.data;
};

const remove = (id, auth) => {
    const config = generateToken(auth);

    const request = axios.delete(`${baseUrl}/${id}`, config);
    return request.then((response) => response.data);
};

export default { getAll, create, addLike, remove };
