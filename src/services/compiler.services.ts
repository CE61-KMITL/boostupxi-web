import { PUBLIC_COMPILER_URL } from "$env/static/public";
import axios from "axios";
import Cookies from "js-cookie";

export const compilerService = {
    submitCode: async (sourceCode: string, questionId: string) => {
        const token: string | undefined = Cookies.get("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
            const response = await axios.post(`${PUBLIC_COMPILER_URL}/compile`, {
                sourceCode,
                questionId,
            });
            return response.data;
        }
        catch (error) {
            const message = (error as Error).message;
            throw new Error(message);
        }
    }
}