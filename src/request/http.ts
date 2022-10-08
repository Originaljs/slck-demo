import axios from "axios";
const baseURL: string = "http://10.18.0.248:9008/";

// config axios
let instance = axios.create();
instance.defaults.baseURL = baseURL;
instance.interceptors.request.use(
    (data: any) => {
        data.params = Object.assign({}, data.params);
        return data;
    },
    (msg: any) => {
        //console.log(msg);
    }
);
instance.interceptors.response.use(
    (res: any) => {
        return res.data;
    },
    (msg: any) => {
        // console.log(msg);
    }
);
export { baseURL, instance };