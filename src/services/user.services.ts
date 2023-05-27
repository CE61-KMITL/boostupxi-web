import Cookies from "js-cookie";
import { api } from "./api.services";

export const userService = {
    login: async (email: string, password: string) => {
        try {
            const response = await api.post("/auth/login", {
                email, password
            });
            Cookies.set('token', response.headers.authorization);
            window.location.href = '/question';
        } catch (error) {
            const message = (error as Error).message;
            throw new Error(message);
        }
    },
    logout: async () => {
        try {
            Cookies.remove('token');
            window.location.href = '/';
            return;
        } catch (error) {
            const message = (error as Error).message;
            throw new Error(message);
        }
    },
    getUserProfile: async () => {
        const token: string | undefined = Cookies.get("token");
        if (token) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const response = await api.get("/users/profile");
            return response.data;
        }
    }
}