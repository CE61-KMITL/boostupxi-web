import { PUBLIC_API_URL } from "$env/static/public";
import axios from "axios";
import Cookies from "js-cookie";

export const loginService = async (email: string, password: string) => {
    const response = await axios.post(`${PUBLIC_API_URL}/auth/login`, {
        email,
        password
    });
    Cookies.set('token', response.headers.authorization);
    window.location.href = '/';
    return response.data;
}

export const logoutService = async () => {
    try {
        Cookies.remove('token');
        window.location.href = '/';
    } catch (error) {
        return error;
    }
}

export const getUserProfileService = async () => {
    const token: string | undefined = Cookies.get("token");
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get(`${PUBLIC_API_URL}/users/profile`);
        return response.data;
    }
}
