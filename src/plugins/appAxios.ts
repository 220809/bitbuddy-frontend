import axios from "axios";

const appAxios = axios.create({
    baseURL: 'http://localhost:8080/api',
});



export default appAxios;