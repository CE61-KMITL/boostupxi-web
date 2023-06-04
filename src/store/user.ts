import { writable, type Writable } from 'svelte/store';
import type { IUser } from '$/interface/user';
import { userService } from '$/services/user.services';

export const initialUser: IUser = {
	email: '',
	username: '',
	score: 0,
	role: '',
	tasks: [],
	_id: '',
	group: '',
	createdAt: '',
	updatedAt: '',
	completedQuestionsCount: 0,
	rank: 0
};

export const user: Writable<IUser> = writable(initialUser);

export const updateUserProfile = async (): Promise<void> => {
	const profileData = await userService.getUserProfile();
	user.set(profileData);
};

updateUserProfile();
