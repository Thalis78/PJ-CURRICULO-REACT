import { httpClient } from "../services/api/api-clientes";

const getCurriculo = async () => {
    try {
        const response = await httpClient({
            endpoint: "/curriculo",
            config: {
                method: "GET",
            },
        });

        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
    }
};
export { getCurriculo };