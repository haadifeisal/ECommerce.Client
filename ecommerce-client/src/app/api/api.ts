import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

axios.defaults.baseURL = 'http://localhost:5000/api/';
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

interface ResponseData {
    data: {
      title: string;
      status: number;
      errors: string[];
    };
    status: number;
}

axios.interceptors.response.use(async response => {
    await sleep();
    return response
}, (error: AxiosError) => {
    const { data, status } = error.response as ResponseData;
    switch (status) {
        case 400:
            if(data.errors){
                const modelStateErrors: string[] = [];
                for(const i in data.errors){
                    if(data.errors[i]){
                        modelStateErrors.push(data.errors[i]);
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            toast.error(data.title);
            break;
        default:
            break;
    }
    return Promise.reject(error.response);
});

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Catalog = {
    list: () => requests.get('product'),
    details: (id: string) => requests.get(`product/${id}`)
}

const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorized'),
    get404Error: () => requests.get('buggy/not-found'),
    getValidationError: () => requests.get('buggy/validation-error'),
    get500Error: () => requests.get('buggy/server-error')
}

const Basket = {
    get: () => requests.get('basket'),
    addItem: (productId: string, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: string, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
}

const api = {
    Catalog,
    TestErrors,
    Basket
}

export default api;