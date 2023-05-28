import { writable } from "svelte/store";
import type { IQuestionData } from "../interface/question";
import { questionService } from "../services/question.services";

export const questionDataStore = writable<IQuestionData[]>([]);
export const questionPage = writable<number>(0);

export async function fetchQuestionData(page: number) {
    const response = await questionService.getQuestions(page);
    questionDataStore.set(response.data);
    questionPage.set(response.pages);
}