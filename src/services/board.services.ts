import { PUBLIC_API_URL } from "$env/static/public";
import axios from "axios";
import Cookies from "js-cookie";

export const getLeaderboardService = async () => {
    const token: string | undefined = Cookies.get("token");
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get(`${PUBLIC_API_URL}/leaderboard`);
        return response.data;
    }
}

export const getLeaderboardGroupService = async () => {
    const token: string | undefined = Cookies.get("token");
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get(`${PUBLIC_API_URL}/leaderboard/group`);
        return response.data;
    }
}