import { initialUser } from '$/constants/user.constants';
import type { IUser } from '$/interface/user';
import { userService } from '$/services/user.services';
import { writable, type Writable } from 'svelte/store';

export const user: Writable<IUser> = writable(initialUser);

export const updateUserProfile = async (): Promise<void> => {
	const profileData = await userService.getUserProfile();
	user.set(profileData);
};

updateUserProfile();