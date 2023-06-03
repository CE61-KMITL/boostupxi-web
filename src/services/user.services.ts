import Cookies from 'js-cookie';
import { axiosInstance } from './api.services';

export const userService = {
	login: async (email: string, password: string) => {
		try {
			const response = await axiosInstance.post('/auth/login', {
				email,
				password
			});
			const token = response.headers.authorization;
			Cookies.set('token', token);
			setTimeout(() => {
				window.location.href = '/question';
			}, 1000);
		} catch (error) {
			const message = (error as Error).message;
			throw new Error(message);
		}
	},
	logout: async () => {
		try {
			Cookies.remove('token');
			setTimeout(() => {
				window.location.href = '/';
			}, 1000);
		} catch (error) {
			const message = (error as Error).message;
			throw new Error(message);
		}
	},
	getUserProfile: async () => {
		const response = await axiosInstance.get('/users/profile');
		return response.data;
	},
	editUserProfile: async (id: string, username: string, password: string) => {
		try {
			console.log(id, username, password);
			const response = await axiosInstance.patch(`/users/${id}`, {
				username,
				password
			});
			return response.data;
		} catch (error) {
			const message = (error as Error).message;
			throw new Error(message);
		}
	}
};
