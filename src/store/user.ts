import { writable, type Writable } from "svelte/store";
import type { IUser } from "../interface/user";
import { userService } from "../services/user.services";

export const user: Writable<IUser> = writable({
    email: "",
    username: "",
    score: 0,
    role: "",
    tasks: []
});

export const updateUserProfile = async (): Promise<void> => {
    const profileData = await userService.getUserProfile();
    user.set(profileData);
};

updateUserProfile();