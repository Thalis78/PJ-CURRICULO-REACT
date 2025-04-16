import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

type HttpClientParams = {
    endpoint: string;
    method?: Method;
    data?: any;
    config?: AxiosRequestConfig;
};

export const httpClient = async ({
    endpoint,
    method = "GET",
    data,
    config,
}: HttpClientParams): Promise<AxiosResponse> => {
    try {
        const response = await axiosInstance.request({
            url: endpoint,
            method,
            data,
            ...config,
        });
        return response;
    } catch (error) {
        console.error("Erro na requisição HTTP:", error);
        throw error;
    }
};
