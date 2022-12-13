import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = 'https://localhost:44374/api/';

const responseBody = (response: AxiosResponse) => response.data;

interface ResponseData {
    data: {
      title: string;
      status: number;
      errors: string[];
    };
    status: number;
}

axios.interceptors.response.use(response => {
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

const api = {
    Catalog,
    TestErrors
}

export default api;