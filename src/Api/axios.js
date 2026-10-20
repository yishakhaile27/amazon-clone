import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.amazon.com/auth/o2/token",
});

export default instance;