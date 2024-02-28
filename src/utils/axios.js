import axios from "axios";
import { stringify } from "qs";
import router from "@/router";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_LINK,
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
    },
    paramsSerializer: {
        serialize: (params) =>
            stringify(params, {
                encode: false,
                allowDots: true,
                skipNulls: true,
            }),
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("token_exp");
            router.push("/");
        }
        return Promise.reject(error);
    }
);

export default instance;
