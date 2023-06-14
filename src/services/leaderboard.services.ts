import { axiosInstance } from './api.services';

export const leaderboardService = {
	getLeaderboard: async (page: number) => {
		try {
			const response = await axiosInstance.get(`/leaderboard?page=${page}&limit=9`);
			return response.data;
		} catch (error) {
			const message = (error as Error).message;
			throw new Error(message);
		}
	},
	getLeaderboardGroup: async () => {
		try {
			const response = await axiosInstance.get(`/leaderboard/group`);
			return response.data;
		} catch (error) {
			const message = (error as Error).message;
			throw new Error(message);
		}
	}
};
