import { writable, type Writable } from "svelte/store";

export const language: Writable<string> = writable('c');

export const changeLanguage = (selectedLanguage: string) => {
    language.set(selectedLanguage);
}