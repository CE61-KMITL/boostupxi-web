import { writable, type Writable } from "svelte/store";
import type { IUser } from "../interface/user";
import { getUserProfileService } from "../services/user.services";

export const user: Writable<IUser> = writable({
    email: "",
    username: "",
    score: 0,
    role: "",
    tasks: []
});

export const updateUserProfile = async (): Promise<void> => {
    const profileData = await getUserProfileService();
    user.set(profileData);
};

updateUserProfile();