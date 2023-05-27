import axios from "axios";
import { PUBLIC_API_URL } from "$env/static/public";

const baseURL: string = PUBLIC_API_URL;

export const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});
