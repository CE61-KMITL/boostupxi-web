import Cookies from "js-cookie";
import { api } from "./api.services";

export const questionService = {
    getQuestions: async (page: number) => {
        try {
            const token: string | undefined = Cookies.get("token");
            if (token) {
                api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                const response = await api.get(`/questions?page=${page}&limit=9`);
                return response.data;
            }
        } catch (error) {
            const message = (error as Error).message;
            throw new Error(message);
        }
    },
    getQuestionById: async (id: string) => {
        try {
            const token: string | undefined = Cookies.get("token");
            if (token) {
                api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                const response = await api.get(`/questions/${id}`);
                return response.data;
            }
        } catch (error) {
            const message = (error as Error).message;
            throw new Error(message);
        }
    }
}