import axios from "axios";
const api_key = import.meta.env.VITE_SOME_KEY;
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";

const getAll = (lat, lon) => {
    const request = axios.get(
        `${baseUrl}lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
    );

    return request.then((response) => {
        return response.data;
    });
};

export default { getAll };
